package com.mobileApps.base.framework.aspects;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

/**
 * @author jCunha
 * AspectJ style aspect for logging method parameters on:
 * com.mobileApps.base.framework.aspects.SystemArchitecture.allPublicOperations() 
 *  && (com.mobileApps.base.framework.aspects.SystemArchitecture.inManagerLayer()  
 * 	||  com.mobileApps.base.framework.aspects.SystemArchitecture.inWebLayer() 
 *  || com.mobileApps.base.framework.aspects.SystemArchitecture.inDataAccessLayer())   
 */
@Aspect
public class LoggingArgumentsAspect
	extends BaseAspect {

	/**
	 * @param order = 0
	 * The order provides a way to declare in which order does the aspect run on 
	 * joinpoint. If order declared is lower than other aspect order that means that 
	 * it runs before the other. In this case we want that logging arguments run before all the others
	 */
	public LoggingArgumentsAspect(int order) {
		super(order);
	}

	@Before(" com.mobileApps.base.framework.aspects.SystemArchitecture.allPublicOperations() " +
			" && (com.mobileApps.base.framework.aspects.SystemArchitecture.inManagerLayer() " +
			"		|| " +
			"	  com.mobileApps.base.framework.aspects.SystemArchitecture.inWebLayer() " +
			"		|| " +
			"	  com.mobileApps.base.framework.aspects.SystemArchitecture.inDataAccessLayer() )")
	public void loggingArguments(JoinPoint jp) throws Throwable{
		if(isEnabled()) {
			final Log log = LogFactory.getLog(this.getClass());
			log.debug("-----------------------------------");
			log.debug("Argument values: " + jp.getStaticPart().getSignature());
			for (Object arg : jp.getArgs()) {
				log.debug(((arg == null) ? null : arg.toString()));
			}
			log.debug("-----------------------------------");
		}
	}	

}
