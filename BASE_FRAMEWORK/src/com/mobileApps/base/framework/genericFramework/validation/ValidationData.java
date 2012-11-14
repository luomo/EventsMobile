package com.mobileApps.base.framework.genericFramework.validation;

import com.mobileApps.base.framework.model.utils.SeverityType;

public class ValidationData {
	
	private SeverityType severityType;
	private String validationMsg;
	
	public ValidationData(SeverityType severityType) {	
		this.severityType = severityType;
	}
	
	public ValidationData(SeverityType severityType, String validationMsg) {	
		this.severityType = severityType;
		this.validationMsg = validationMsg;
	}
	
	// ************** getters and Setters **********************

	public SeverityType getSeverityType() {
		return severityType;
	}

	public void setSeverityType(SeverityType severityType) {
		this.severityType = severityType;
	}

	public String getValidationMsg() {
		return validationMsg;
	}

	public void setValidationMsg(String validationMsg) {
		this.validationMsg = validationMsg;
	}

	
}
