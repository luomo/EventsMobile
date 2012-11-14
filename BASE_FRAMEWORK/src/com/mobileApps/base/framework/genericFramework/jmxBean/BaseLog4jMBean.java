package com.mobileApps.base.framework.genericFramework.jmxBean;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.apache.log4j.Level;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.jmx.export.annotation.ManagedOperation;
import org.springframework.jmx.export.annotation.ManagedResource;

@ManagedResource
public class BaseLog4jMBean {
	
	

	@ManagedOperation
	public void enableInfo(String target){
		LogManager.getLogger(target).setLevel(Level.INFO);
	}

	@ManagedOperation
	public void enableWarn(String target){
		LogManager.getLogger(target).setLevel(Level.WARN);
	}

	@ManagedOperation
	public void enableError(String target){
		LogManager.getLogger(target).setLevel(Level.ERROR) ;
	}

	@ManagedOperation
	public void enableDebug(String target){
		LogManager.getLogger(target).setLevel(Level.DEBUG) ;
	}
	
	@ManagedOperation
	public List<String> getCurrentLoggers(){
		List<String> loggers = new ArrayList<String>();
		@SuppressWarnings("rawtypes")
		Enumeration currentLoggers = LogManager.getCurrentLoggers();
		while(currentLoggers.hasMoreElements())
			loggers.add(((Logger) currentLoggers.nextElement()).getName());
		return loggers;
	}
	
	@ManagedOperation
	public Logger getRootLogger(){
		return LogManager.getRootLogger();
	}
	
	@ManagedOperation
	public void defaultAllLoggersToProdLevel(){
		@SuppressWarnings("rawtypes")
		Enumeration currentLoggers = LogManager.getCurrentLoggers();
		while(currentLoggers.hasMoreElements())
			((Logger) currentLoggers.nextElement()).setLevel(Level.ERROR);
	}
	
	@ManagedOperation
	public void addLogger(String loggerName){
		LogFactory.getLog(loggerName);
	}
	
	@ManagedOperation
	public boolean isDebugEnable(){
		return LogManager.getRootLogger().isDebugEnabled();
	}
	
	@ManagedOperation
	public void isDebugEnable(String loggerName){
		LogManager.getLogger(loggerName).isDebugEnabled();
	}
	
	@ManagedOperation
	public boolean isTraceEnable(){
		return LogManager.getRootLogger().isTraceEnabled();
	}
	
	@ManagedOperation
	public boolean isTraceEnable(String loggerName){
		return LogManager.getLogger(loggerName).isTraceEnabled();
	}
	
	@ManagedOperation
	public boolean isInfoEnable(){
		return LogManager.getRootLogger().isInfoEnabled();
	}
	
	@ManagedOperation
	public boolean isInfoEnable(String loggerName){
		return LogManager.getLogger(loggerName).isInfoEnabled();
	}
}
