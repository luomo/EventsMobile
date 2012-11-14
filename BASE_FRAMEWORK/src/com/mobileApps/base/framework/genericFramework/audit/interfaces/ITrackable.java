package com.mobileApps.base.framework.genericFramework.audit.interfaces;

import java.util.Date;

public interface ITrackable {

	public void setLastChangeUser(String lastChangeUser);
	
	public void setLastChangeDate(Date lastChangeDate);
}
