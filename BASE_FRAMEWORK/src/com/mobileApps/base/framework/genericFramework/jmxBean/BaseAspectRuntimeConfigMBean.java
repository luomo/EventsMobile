package com.mobileApps.base.framework.genericFramework.jmxBean;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jmx.export.annotation.ManagedOperation;
import org.springframework.jmx.export.annotation.ManagedResource;

import com.mobileApps.base.framework.aspects.LoggingArgumentsAspect;
import com.mobileApps.base.framework.aspects.PerformanceProfilingAspect;

@ManagedResource
public class BaseAspectRuntimeConfigMBean {

	private final Log log = LogFactory.getLog(this.getClass());
	private LoggingArgumentsAspect loggingArgumentsAspect;
	private PerformanceProfilingAspect performanceProfilingAspect;

	@ManagedOperation
	public void enableLoggingArgumentsAspect(){
		loggingArgumentsAspect.setEnabled(true);
		log.info("Enabled LoggingArgumentsAspect");
	}
	
	@ManagedOperation
	public void disableLoggingArgumentsAspect(){
		loggingArgumentsAspect.setEnabled(false);
		log.info("Disable LoggingArgumentsAspect");
	}
	
	@ManagedOperation
	public void enablePerformanceProfilingAspect(){
		performanceProfilingAspect.setEnabled(true);
		log.info("Enabled PerformanceProfilingAspect");
	}
	
	@ManagedOperation
	public void disablePerformanceProfilingAspect(){
		performanceProfilingAspect.setEnabled(false);
		log.info("Disable PerformanceProfilingAspect");
	}
	
	// ********* getters and setters ***********
	
	public LoggingArgumentsAspect getLoggingArgumentsAspect() {
		return loggingArgumentsAspect;
	}
	public void setLoggingArgumentsAspect(
			LoggingArgumentsAspect loggingArgumentsAspect) {
		this.loggingArgumentsAspect = loggingArgumentsAspect;
	}
	public PerformanceProfilingAspect getPerformanceProfilingAspect() {
		return performanceProfilingAspect;
	}
	public void setPerformanceProfilingAspect(
			PerformanceProfilingAspect performanceProfilingAspect) {
		this.performanceProfilingAspect = performanceProfilingAspect;
	}
	
	
	
	
	
}
