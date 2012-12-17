package com.mobileApps.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.mobileApps.base.framework.genericFramework.ruleProcessor.ruleProcessor.IRuleProcessor;
import com.mobileApps.base.framework.genericFramework.service.GenericServiceImpl;
import com.mobileApps.server.dao.IEventDao;
import com.mobileApps.server.dao.IUserDao;
import com.mobileApps.server.domain.Event;
import com.mobileApps.server.domain.User;

@Service
public class UserService 
	extends GenericServiceImpl<User, Long, IUserDao>
	implements IUserService{
	
	@Autowired
	private IEventDao eventDao; 

	@Autowired
	public UserService( 
			@Qualifier("userDao") IUserDao dao,
			@Qualifier("ruleProcessor") IRuleProcessor ruleProcessor) {
		super(dao, ruleProcessor);
	}
	

	@Override
	public User addEventToUserFavourites(Long userId, Event event) {
		
		User user = getGenericDao().findById(userId);
		user.getFavourtites().add(event);
		user = getGenericDao().merge(user);
		return user;
	}


	@Override
	public User removeEventFromUserFavourites(Long userId, Event event) {

		User user = getGenericDao().findById(userId);
		user.getFavourtites().remove(event);
		user = getGenericDao().merge(user);
		return user;

	}


	@Override
	public User addEventToUserFavourites(Long userId, Long eventId) {
		User user = getGenericDao().findById(userId);
		Event event = eventDao.findById(eventId);
		user.getFavourtites().add(event);
		user = getGenericDao().merge(user);
		return user;
	}


	@Override
	public User removeEventFromUserFavourites(Long userId, Long eventId) {
		User user = getGenericDao().findById(userId);
		Event event = eventDao.findById(eventId);
		user.getFavourtites().remove(event);
		user = getGenericDao().merge(user);
		return user;
	}
	
	
}
