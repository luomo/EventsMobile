package com.mobileApps.base.framework.model.utils;

public enum IunEntityStatus {
	
	IN_PROGRESS("I"),
	CLOSED("C"),
	DELETED("D");
	
	private String status;
	
	IunEntityStatus(String status) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}
}
