package com.mobileApps.base.framework.aspects;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.core.Ordered;
import org.springframework.util.StopWatch;

/**
 * @author jCunha
 * AspectJ style aspect for logging/profiling performance on service public methods 
 */
@Aspect
public class WSPerformanceProfilingAspect
	extends BaseAspect
	implements Ordered{

	/**
	 * @param order = 1
	 * The order provides a way to declare in which order does the aspect run on 
	 * joinpoint. If order declared is lower than other aspect order that means that 
	 * it runs before the other. In this aspect we want to perform profilling when the 
	 * method starts to run but before tx advice being applied which has order = 10 
	 */
	public WSPerformanceProfilingAspect(int order) {
		super(order);
	}
	

	@Around(" com.mobileApps.base.framework.aspects.SystemArchitecture.allPublicOperations() " +
			" && @annotation(org.springframework.ws.server.endpoint.annotation.PayloadRoot) " +
			" && com.mobileApps.base.framework.aspects.SystemArchitecture.inWSLayer() ")
	public Object profile(ProceedingJoinPoint pjp) throws Throwable {
		if(isEnabled()) {
			final Log log = LogFactory.getLog(this.getClass());
			StopWatch sw = new StopWatch("\nProfiling WS layer: " + pjp.getTarget().getClass().getSimpleName());
			try {
				sw.start(pjp.getTarget().getClass().getSimpleName() + "." + pjp.getSignature().getName());
				return pjp.proceed();
			} finally {
				sw.stop();
				log.debug(sw.prettyPrint());
			}
		} else
			return pjp.proceed();
	}
	
}
