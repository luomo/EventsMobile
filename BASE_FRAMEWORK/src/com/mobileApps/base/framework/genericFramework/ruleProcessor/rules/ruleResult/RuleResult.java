package com.mobileApps.base.framework.genericFramework.ruleProcessor.rules.ruleResult;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.mobileApps.base.framework.genericFramework.exception.ValidationException;


/**
 * @author Joao Cunha
 *
 */
public class RuleResult {

	private String stringResult = null;
	private Boolean booleanResult = null;
	private Integer integerResult = null;
	private Long longResult = null;
	private Object objectResult = null;
	private ValidationResult validationResult;
	private boolean isValidationResult;
	private Log log = LogFactory.getLog(this.getClass());
	
	/**
	 * Constructor for String result
	 */
	public RuleResult(String result) throws ValidationException {
		stringResult = result;
	}

	/**
	 * Constructor for Boolean result
	 */
	public RuleResult(Boolean result) throws ValidationException {
		booleanResult = result;
	}
	
	/**
	 * Constructor for Integer result
	 */
	public RuleResult(Integer result) throws ValidationException {
		integerResult = result;
	}
	
	
	/**
	 * Constructor for Long result
	 */
	public RuleResult(Long result) throws ValidationException {
		longResult = result;
	}
	
	/**
	 * Constructor for Object result
	 */
	public RuleResult(Object result) throws ValidationException {
		objectResult = result;
	}
	
	/**
	 * Constructor for Validation result
	 */
	public RuleResult(ValidationResult validationResult) throws ValidationException {
		this.validationResult = validationResult;
		this.isValidationResult = true;
	}
	
		
	public String getResultAsString() throws ValidationException {
		return stringResult;
	}

	public Boolean getResultAsBoolean() throws ValidationException {
		return booleanResult;
	}
	
	public Integer getResultAsInteger() throws ValidationException {
		return integerResult;
	}

	
	public Long getResultAsLong() throws ValidationException {
		return longResult;
	}
	
	public Object getResultAsObject() throws ValidationException {
		return objectResult;
	}
	
	public ValidationResult getResultAsValidationResult() throws ValidationException {
		return this.validationResult;
	}


	public boolean isValidationResult() {
		return isValidationResult;
	}


	public void setLog(Log log) {
		this.log = log;
	}

	public Log getLog() {
		return log;
	}
	
	
	
}
