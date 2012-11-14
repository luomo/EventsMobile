package com.mobileApps.base.framework.genericFramework.exception;

import java.util.Date;

/**
 * @author jCunha
 *
 */
public class BaseUncheckedException 
	extends RuntimeException 
	implements BaseException{

	private final String error_id;
	private final Date errorDate;
	private StringBuilder contextMessage = new StringBuilder(this.getClass() + ":" + "ContextualErrorInfo: ");
	
	public BaseUncheckedException(String error_id){
		super();
		this.error_id = error_id;
		this.errorDate = new Date();
	}



	public BaseUncheckedException(String error_id,String message, Throwable cause) {
		super(message, cause);
		this.error_id = error_id;
		this.errorDate = new Date();
	}



	public BaseUncheckedException(String error_id, Throwable cause) {
		super(cause);
		this.error_id = error_id;
		this.errorDate = new Date();
	}



	/* (non-Javadoc)
	 * @see com.mobileApps.base.framework.genericFramework.exception.BaseException#getError_id()
	 */
	@Override
	public String getError_id() {
		return error_id;
	}
	
	/* (non-Javadoc)
	 * @see com.mobileApps.base.framework.genericFramework.exception.BaseException#addToContext(java.lang.Object)
	 */
    @Override
	public void addToContext(Object o) {
    	if(o != null)
    		contextMessage.append(o.toString()).append(System.getProperty("line.separator"));
    }

    /* (non-Javadoc)
	 * @see com.mobileApps.base.framework.genericFramework.exception.BaseException#addToContext(java.lang.Object, java.lang.String)
	 */
    @Override
	public void addToContext(Object o, String description) {
        contextMessage.append(description).append(": ").append(o).append(System.getProperty("line.separator"));
    }

    /* (non-Javadoc)
	 * @see com.mobileApps.base.framework.genericFramework.exception.BaseException#getContextMessage()
	 */
    @Override
	public String getContextMessage() {
        return contextMessage.toString();
    }

	/* (non-Javadoc)
	 * @see com.mobileApps.base.framework.genericFramework.exception.BaseException#getErrorDate()
	 */
	@Override
	public Date getErrorDate() {
		return errorDate;
	}


    
}
