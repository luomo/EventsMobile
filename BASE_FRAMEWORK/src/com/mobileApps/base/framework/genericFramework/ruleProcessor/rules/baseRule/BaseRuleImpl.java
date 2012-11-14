package com.mobileApps.base.framework.genericFramework.ruleProcessor.rules.baseRule;

import org.apache.log4j.Logger;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.mobileApps.base.framework.genericFramework.exception.ValidationException;
import com.mobileApps.base.framework.genericFramework.ruleProcessor.rules.ruleResult.RuleResult;

public abstract class BaseRuleImpl
	extends HibernateDaoSupport
	implements BaseRule{
	
	public Logger getLog(){
		return Logger.getLogger(this.getClass());
	}
	
	public abstract RuleResult process() throws ValidationException;

	
}
