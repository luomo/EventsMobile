package com.mobileApps.base.framework.genericFramework.ruleProcessor.ruleProcessor;

import com.mobileApps.base.framework.genericFramework.exception.ValidationException;
import com.mobileApps.base.framework.genericFramework.ruleProcessor.rules.baseRule.BaseRule;
import com.mobileApps.base.framework.genericFramework.ruleProcessor.rules.ruleResult.RuleResult;


public class RuleProcessor 
	implements IRuleProcessor{


	public RuleProcessor() {
	}

	public RuleResult processRule(BaseRule rule) throws ValidationException
	{
		return rule.process();
	}
}
