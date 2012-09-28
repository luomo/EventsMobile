package com.mobileApps.server.ws.service;

import java.util.ArrayList;
import java.util.List;

import com.mobileApps.server.ws.domain.UserInfo;

public class UserService {

	private static final List<UserInfo> userList; 
	 
	
	static {
		
		userList = new ArrayList<UserInfo>();
		userList.add(new UserInfo("luomo", "1234"));
	}
	

	public static boolean registerUser(UserInfo userInfo) {
		for (UserInfo user : userList) {
			if(user.getUsername().equalsIgnoreCase(userInfo.getUsername()))
				return false;
		}
		userList.add(userInfo);
		return true;
	}

	
	
}
