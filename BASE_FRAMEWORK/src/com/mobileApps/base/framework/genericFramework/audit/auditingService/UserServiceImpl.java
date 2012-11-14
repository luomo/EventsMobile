package com.mobileApps.base.framework.genericFramework.audit.auditingService;

//import javax.faces.context.FacesContext;

import com.mobileApps.base.framework.security.IUserBean;

public class UserServiceImpl 
	implements IUserService {

	
	
	private static ThreadLocal<String> userInfo = new ThreadLocal<String>(){
		@Override
		public String get() {
//			IUserBean initBean = (IUserBean) FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("initBean");
//			return initBean.getUserName();
			return "toImplement";
		}
	};

	public static String getUser(){
		return userInfo.get();
	}


}
