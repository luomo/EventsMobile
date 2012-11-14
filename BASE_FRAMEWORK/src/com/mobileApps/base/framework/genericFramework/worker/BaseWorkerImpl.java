package com.mobileApps.base.framework.genericFramework.worker;

import org.apache.log4j.Logger;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

public abstract class BaseWorkerImpl 
	extends HibernateDaoSupport
	implements IBaseWorker{

	public Logger getLog(){
		return Logger.getLogger(this.getClass());
	}
}
