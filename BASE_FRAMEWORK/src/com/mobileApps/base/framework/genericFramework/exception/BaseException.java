package com.mobileApps.base.framework.genericFramework.exception;

import java.util.Date;

public interface BaseException {

	public abstract String getError_id();

	/**
	 * Adds an object to the exception context string.
	 * @param o application object whose content may be of interest in the context of this exception
	 */
	public abstract void addToContext(Object o);

	/**
	 * Adds an object and its description to the exception's context string.
	 * @param o application object whose content may be of interest in the context of this exception
	 * @param description clarifying description of the object being added to context
	 */
	public abstract void addToContext(Object o, String description);

	/**
	 * Gets the string representation of all objects stored in this exception's context.
	 * @return concatenated string of all context object toString() representations
	 */
	public abstract String getContextMessage();

	/**
	 * Gets the Exception creation date 
	 * @return exception create date
	 */
	public abstract Date getErrorDate();

}