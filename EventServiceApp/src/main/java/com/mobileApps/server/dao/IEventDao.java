package com.mobileApps.server.dao;

import java.util.List;

import com.mobileApps.base.framework.genericFramework.dao.GenericDAO;
import com.mobileApps.server.domain.Event;

public interface IEventDao 
	extends GenericDAO<Event, Long>{

	public List<Event> findEventListBasedOnGeoLocation(
			Float latitude,
			Float longitude, 
			Integer distanceToSearch,
			Integer numberOfEventToReturn);

}
