package com.mobileApps.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.mobileApps.base.framework.genericFramework.ruleProcessor.ruleProcessor.IRuleProcessor;
import com.mobileApps.base.framework.genericFramework.service.GenericServiceImpl;
import com.mobileApps.server.dao.IEventDao;
import com.mobileApps.server.domain.Event;

@Service
public class EventService 
	extends GenericServiceImpl<Event, Long, IEventDao>
	implements IEventService{

	@Autowired
	public EventService( 
			@Qualifier("eventDao") IEventDao dao,
			@Qualifier("ruleProcessor") IRuleProcessor ruleProcessor) {
		super(dao, ruleProcessor);
	}
	
	public List<Event> findEventListBasedOnGeoLocation(Float latitude, Float longitude, Integer distanceToSearch, Integer numberOfEventToReturn){
		return getGenericDao().findEventListBasedOnGeoLocation(latitude, longitude, distanceToSearch, numberOfEventToReturn);
	}
}
