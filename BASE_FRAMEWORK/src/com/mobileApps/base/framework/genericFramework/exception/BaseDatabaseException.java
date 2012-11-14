package com.mobileApps.base.framework.genericFramework.exception;

public class BaseDatabaseException 
	extends BaseUncheckedException{

	public BaseDatabaseException(Throwable t) {
		super("iun.core.model.noDatabaseAccess", t);
	}
	
}
