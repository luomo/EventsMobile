package com.mobileApps.base.framework.genericFramework.audit.auditingService;

import org.hibernate.envers.RevisionListener;

import com.mobileApps.base.framework.genericFramework.audit.model.IunRevision;

public class IunRevisionListener
	implements RevisionListener{

	
	@Override
	public void newRevision(Object revision) {
		IunRevision revisionEntity = (IunRevision) revision;
		revisionEntity.setUsername(UserServiceImpl.getUser());
	}


	
	
}
