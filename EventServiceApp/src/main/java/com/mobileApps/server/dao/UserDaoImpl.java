package com.mobileApps.server.dao;

import com.mobileApps.base.framework.genericFramework.dao.HibernateGenericDaoImpl;
import com.mobileApps.server.domain.User;


public class UserDaoImpl
	extends HibernateGenericDaoImpl<User, Long>
	implements IUserDao{

}
