package com.mobileApps.base.framework.model.utils;

public enum DatabaseFlag {
	
	YES("Y"),
	NO("N");
	
	private String value;
	
	DatabaseFlag(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
