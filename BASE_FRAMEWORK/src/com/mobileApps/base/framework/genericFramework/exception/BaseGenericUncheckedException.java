package com.mobileApps.base.framework.genericFramework.exception;

public class BaseGenericUncheckedException 
	extends BaseUncheckedException{

	public BaseGenericUncheckedException(Throwable t) {
		super(BaseGenericUncheckedException.getMessage(t), t);
	}
	
	private static String getMessage(Throwable t){
		return (t.getMessage() == null) ? t.getClass().getName() : t.getMessage() ; 
	}
}
