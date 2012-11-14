package com.mobileApps.base.framework.aspects;

import org.springframework.core.Ordered;



/**
 * @author jCunha
 * Base class for Iun aspects.
 *
 */
public abstract class BaseAspect 
	implements Ordered {

	private boolean enabled;
	private int order = 0;

	public BaseAspect(int order){
		this.order = order;
	}
	
	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	
	
	@Override
	public int getOrder() {
		return order;
	}

	/**
	 * @param order - allows control over the ordering of the advice
	 * This method is public to provide a way of changing advice order by spring config 
	 */
	public void setOrder(int order) {
		this.order = order;
	}

}
