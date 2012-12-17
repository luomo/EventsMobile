package com.mobileApps.server.services;

import com.mobileApps.base.framework.genericFramework.service.GenericService;
import com.mobileApps.server.domain.Event;
import com.mobileApps.server.domain.User;

public interface IUserService 
	extends GenericService<User, Long>{

	public User addEventToUserFavourites(Long userId, Event event);

	public User removeEventFromUserFavourites(Long userId, Event event);

	public User addEventToUserFavourites(Long userId, Long eventId);

	public User removeEventFromUserFavourites(Long userId, Long eventId);
	
}
