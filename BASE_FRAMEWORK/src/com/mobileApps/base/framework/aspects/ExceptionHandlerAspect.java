package com.mobileApps.base.framework.aspects;

import java.lang.reflect.Method;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.hibernate.HibernateException;
import org.hibernate.exception.GenericJDBCException;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.HibernateOptimisticLockingFailureException;

import com.mobileApps.base.framework.genericFramework.exception.BaseCheckedException;
import com.mobileApps.base.framework.genericFramework.exception.BaseException;
import com.mobileApps.base.framework.genericFramework.exception.BaseUncheckedException;
import com.mobileApps.base.framework.genericFramework.exception.BaseDatabaseException;
import com.mobileApps.base.framework.genericFramework.exception.BaseGenericUncheckedException;
import com.mobileApps.base.framework.genericFramework.exception.BaseOptimisticLockExceptionException;

/**
 * @author jCunha
 * 
 * This class is a post throwing aspect for intercepting public manager methods exceptions.
 * It has three defined objectives:
 * 	- catch exceptions and collect contextual info about them
 *  - log them as this will be the leave point of business logic layer
 *  - throw meanfull application exceptions  
 *
 */
@Aspect
public class ExceptionHandlerAspect 
	extends BaseAspect{

	/**
	 * @param order = 100
	 * The order provides a way to declare in which order does the aspect run on 
	 * joinpoint. If order declared is lower than other aspect order that means that 
	 * it runs before the other. In this case we to run it after all the others
	 */
	public ExceptionHandlerAspect(int order) {
		super(order);
	}

	private Log log = LogFactory.getLog(this.getClass());
	
	@AfterThrowing( value = "  com.mobileApps.base.framework.aspects.SystemArchitecture.allPublicOperations()" +
			                "  && com.mobileApps.base.framework.aspects.SystemArchitecture.inManagerLayer() " , 
					throwing = "ex")
	public void handleException(JoinPoint jp, 
								Throwable ex) throws Throwable{
		
		
		if(ex instanceof HibernateOptimisticLockingFailureException ) {
			BaseOptimisticLockExceptionException iunDbException = new BaseOptimisticLockExceptionException(ex);
			this.addContextInfoToIunException(jp, iunDbException);
			getLog().error(iunDbException.getContextMessage(), ex);
			throw iunDbException;
		}
		else if(ex instanceof DataAccessException ) {
			BaseDatabaseException iunDbException = new BaseDatabaseException(ex);
			this.addContextInfoToIunException(jp, iunDbException);
			getLog().error(iunDbException.getContextMessage(), ex);
			throw iunDbException;
		}
		else if(ex instanceof HibernateException ) {
			BaseDatabaseException iunDbException = new BaseDatabaseException(ex);
			this.addContextInfoToIunException(jp, iunDbException);
			if(ex instanceof GenericJDBCException)
				iunDbException.addToContext(this.formatSql(((GenericJDBCException) ex).getSQL()), "Sql query");
			getLog().error(iunDbException.getContextMessage(), ex);
			throw iunDbException;
		}
		else if(ex instanceof SQLException ) {
			BaseDatabaseException iunDbException = new BaseDatabaseException(ex);
			this.addContextInfoToIunException(jp, iunDbException);
			getLog().error(iunDbException.getContextMessage(), ex);
			throw iunDbException;
		}
		else if(ex instanceof BaseUncheckedException){
			this.addContextInfoToIunException(jp, (BaseUncheckedException)ex);
			getLog().error(((BaseUncheckedException)ex).getContextMessage(), ex);
			throw (BaseUncheckedException)ex;
		}
		else if(ex instanceof BaseCheckedException){
			this.addContextInfoToIunException(jp, (BaseCheckedException)ex);
			getLog().debug(((BaseCheckedException)ex).getContextMessage(), ex);
			throw (BaseCheckedException)ex;
		} else {
			BaseGenericUncheckedException iunException = new BaseGenericUncheckedException(ex);
			this.addContextInfoToIunException(jp,iunException);
			getLog().error(iunException.getContextMessage(), ex);
			throw iunException;
		}
	}
	

	// ************* private utility methods **************
	
	private void addContextInfoToIunException(
			JoinPoint jp, 
			BaseException iunException) {
		
		List<Object> methodArgs = Arrays.asList(jp.getArgs());
		MethodSignature signature =  (MethodSignature) jp.getSignature();
		Method method = signature.getMethod();
		iunException.addToContext(method, "Method Signature");
		iunException.addToContext(methodArgs, "Method args");
		
	}

	private String formatSql(String sql) {
		return sql.replaceAll("\\s(\\s)+", "");
	}


	// ************* getters and setters **************
	
	public Log getLog() {
		return log;
	}

	public void setLog(Log log) {
		this.log = log;
	}
	

	
}
