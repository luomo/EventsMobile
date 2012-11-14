package com.mobileApps.base.framework.genericFramework.exception;

public class ValidationException 
	extends BaseUncheckedException {
	
	public ValidationException(Throwable cause) {
		super("iun.core.model.validationException", cause);
	}

}
