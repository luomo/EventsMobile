package com.mobileApps.base.framework.genericFramework.ruleProcessor.ruleProcessor;

import com.mobileApps.base.framework.genericFramework.exception.ValidationException;
import com.mobileApps.base.framework.genericFramework.ruleProcessor.rules.baseRule.BaseRule;
import com.mobileApps.base.framework.genericFramework.ruleProcessor.rules.ruleResult.RuleResult;

public interface IRuleProcessor {

	public RuleResult processRule(BaseRule rule) throws ValidationException;
}
