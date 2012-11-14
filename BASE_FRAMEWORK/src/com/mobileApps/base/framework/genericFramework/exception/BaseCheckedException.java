package com.mobileApps.base.framework.genericFramework.exception;

import java.util.Date;

/**
 * @author jCunha
 *
 */
public class BaseCheckedException 
	extends Exception
	implements BaseException{

	private final String error_id;
	private final Date errorDate;
	private StringBuilder contextMessage = new StringBuilder(this.getClass() + ":" + "ContextualErrorInfo: ");
	
	public BaseCheckedException(String error_id){
		super();
		this.error_id = error_id;
		this.errorDate = new Date();
	}



	public BaseCheckedException(String error_id,String message, Throwable cause) {
		super(message, cause);
		this.error_id = error_id;
		this.errorDate = new Date();
	}



	public BaseCheckedException(String error_id, Throwable cause) {
		super(cause);
		this.error_id = error_id;
		this.errorDate = new Date();
	}



	public String getError_id() {
		return error_id;
	}
	
	/**
     * Adds an object to the exception context string.
     * @param o application object whose content may be of interest in the context of this exception
     */
    public void addToContext(Object o) {
        contextMessage.append(o.toString()).append(System.getProperty("line.separator"));
    }

    /**
     * Adds an object and its description to the exception's context string.
     * @param o application object whose content may be of interest in the context of this exception
     * @param description clarifying description of the object being added to context
     */
    public void addToContext(Object o, String description) {
        contextMessage.append(description).append(": ").append(o);
    }

    /**
     * Gets the string representation of all objects stored in this exception's context.
     * @return concatenated string of all context object toString() representations
     */
    public String getContextMessage() {
        return contextMessage.toString();
    }
    
    @Override
	public Date getErrorDate() {
		return errorDate;
	}
	
}
