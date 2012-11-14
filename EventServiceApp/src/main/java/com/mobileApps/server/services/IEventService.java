package com.mobileApps.server.services;

import java.util.List;

import com.mobileApps.base.framework.genericFramework.service.GenericService;
import com.mobileApps.server.domain.Event;

public interface IEventService 
	extends GenericService<Event, Long>{

	public List<Event> findEventListBasedOnGeoLocation(Float latitude, Float longitude, Integer distanceToSearch, Integer numberOfEventToReturn);
}
