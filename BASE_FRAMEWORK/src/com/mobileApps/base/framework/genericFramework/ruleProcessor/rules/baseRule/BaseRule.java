package com.mobileApps.base.framework.genericFramework.ruleProcessor.rules.baseRule;

import com.mobileApps.base.framework.genericFramework.exception.ValidationException;
import com.mobileApps.base.framework.genericFramework.ruleProcessor.rules.ruleResult.RuleResult;

public interface BaseRule {

	public RuleResult process() throws ValidationException;
}
