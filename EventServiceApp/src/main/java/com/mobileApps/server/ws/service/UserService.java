package com.mobileApps.server.ws.service;

import java.util.ArrayList;
import java.util.List;

import com.mobileApps.server.domain.User;

public class UserService {

	private static final List<User> userList; 
	 
	
	static {
		
		userList = new ArrayList<User>();
		userList.add(new User("luomo", "1234"));
	}
	

	public static boolean registerUser(User userInfo) {
		for (User user : userList) {
			if(user.getUsername().equalsIgnoreCase(userInfo.getUsername()))
				return false;
		}
		userList.add(userInfo);
		return true;
	}

	
	
}
