package com.mobileApps.base.framework.genericFramework.exception;

public class BaseOptimisticLockExceptionException 
	extends BaseUncheckedException{

	public BaseOptimisticLockExceptionException(Throwable t) {
		super("iun.core.model.iunOptimisticLockException", t);
	}
	
}
