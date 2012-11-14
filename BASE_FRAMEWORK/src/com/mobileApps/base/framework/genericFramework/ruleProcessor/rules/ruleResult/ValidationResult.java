package com.mobileApps.base.framework.genericFramework.ruleProcessor.rules.ruleResult;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.mobileApps.base.framework.genericFramework.exception.ValidationException;
import com.mobileApps.base.framework.genericFramework.ruleProcessor.rules.ValidationRulesFailCauseEnum;

public class ValidationResult {
	
	private ValidationResultEnum validationResultEnum;
	private ValidationRulesFailCauseEnum validationFailCauseEnum;
	private Object[] failArgs;
	private Log log = LogFactory.getLog(this.getClass());
	
	
	public ValidationResult(ValidationResultEnum result){
		this.validationResultEnum = result;
		if(validationResultEnum.equals(ValidationResultEnum.OK))
			this.validationFailCauseEnum = ValidationRulesFailCauseEnum.IUN_CORE_VALIDATIONRULE_OK;
		else {
			log.debug("Please use constructor with validation and rule cause");
			throw new IllegalStateException("Please present a reason for rule failure");
		}
	}
	
	public ValidationResult( ValidationResultEnum validationResultEnum, 
							 ValidationRulesFailCauseEnum validationFailCauseEnum, 
							 Object... failArgs) throws ValidationException {
		this.validationResultEnum = validationResultEnum;
		this.validationFailCauseEnum = validationFailCauseEnum;
		this.failArgs = failArgs;
	}
	
	
	// ******************* getters and setters ****************
		
	public ValidationResultEnum getValidationResultEnum() {
		return validationResultEnum;
	}
	public void setValidationResultEnum(ValidationResultEnum validationResultEnum) {
		this.validationResultEnum = validationResultEnum;
	}
	public ValidationRulesFailCauseEnum getValidationFailCauseEnum() {
		return validationFailCauseEnum;
	}
	public void setValidationFailCauseEnum(
			ValidationRulesFailCauseEnum validationFailCauseEnum) {
		this.validationFailCauseEnum = validationFailCauseEnum;
	}
	
	public Object[] getFailArgs() {
		return failArgs;
	}

	public void setFailArgs(String[] failArgs) {
		this.failArgs = failArgs;
	}

	public Log getLog() {
		return log;
	}
	public void setLog(Log log) {
		this.log = log;
	}
}

