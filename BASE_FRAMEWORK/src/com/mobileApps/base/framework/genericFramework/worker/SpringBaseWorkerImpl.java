package com.mobileApps.base.framework.genericFramework.worker;

import org.apache.log4j.Logger;

public abstract class SpringBaseWorkerImpl 
	implements IBaseWorker{

	public Logger getLog(){
		return Logger.getLogger(this.getClass());
	}
}
