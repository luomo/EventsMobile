package com.mobileApps.base.framework.aspects;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;

/**
 * @author jCunha
 * AspectJ style aspect that provides generic pointcuts for being reused in other 
 * aspects or parts of the application
 */
@Aspect
public class SystemArchitecture {

	
	/**
	 * Join point for all public operations
	 */
	@Pointcut("execution(public * *(..))")
	public void allPublicOperations(){}
	
	/**
	 * Join point for classes annotated with @Profilable 
	 */
	@Pointcut("within(@com.mobileApps.base.framework.annotations.Profilable *)")
	public void profilable(){}
	
	
	/**
	 * Join point for the dao layer
	 */
	@Pointcut("within(com.wipro.despar..*dao*..*)")
	public void inDataAccessLayer(){}
	
	/**
	 * Join point for the service/manager layer
	 */
	@Pointcut("within(com.wipro.despar..*manager*..*)")
	public void inManagerLayer(){}
	
	/**
	 * Join point for the web layer
	 */
	@Pointcut("within(com.wipro.despar..*web*..*)")
	public void inWebLayer(){}
	
	/**
	 * Join point for the ws layer
	 */
	@Pointcut("within(com.wipro.despar..*ws*..*)")
	public void inWSLayer(){}
	
	
}
