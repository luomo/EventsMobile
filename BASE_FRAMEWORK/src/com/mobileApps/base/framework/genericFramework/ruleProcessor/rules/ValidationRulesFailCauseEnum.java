package com.mobileApps.base.framework.genericFramework.ruleProcessor.rules;

public enum ValidationRulesFailCauseEnum {

	IUN_CORE_VALIDATIONRULE_OK("OK"),
	
	IUN_CORE_VALIDATIONRULE_UNKNOWN_ERROR("iun.core.validationRule.unknown.error"),
	
	IUN_CORE_VALIDATIONRULE_ITEMQUANTITY_DECIMAL_ERROR("iun.core.validationRule.itemQuantity.decimal.error"),
	IUN_CORE_VALIDATIONRULE_ITEMQUANTITY_INVALIDQTYFOREXPOSITOREITEM_WARNING("iun.core.validationRule.itemQuantity.invalidQtyForExpositoreItem.warning"),
	IUN_CORE_VALIDATIONRULE_ITEMQUANTITY_QTYTOBIG_WARNING("iun.core.validationRule.itemQuantity.qtyToBig.warning"),
	
	IUN_CORE_VALIDATIONRULE_CHECKSKULOCASSORT_INVALIDITEM_ERROR("iun.core.validationRule.checkSkuLocAssort.invalidItem.error"),
	IUN_CORE_VALIDATIONRULE_CHECKSKULOCASSORT_ITEMNOTINSTOREASSORT_ERROR("iun.core.validationRule.checkSkuLocAssort.itemNotInStoreAssort.error"),
	IUN_CORE_VALIDATIONRULE_CHECKSKULOCASSORT_ITEMNOTINSUPPLIERASSORT_WARNING("iun.core.validationRule.checkSkuLocAssort.itemNotInSupplierAssort.warning"),
	IUN_CORE_VALIDATIONRULE_CHECKSKULOCASSORT_ITEMNOTINSUPPLIERASSORT_ERROR("iun.core.validationRule.checkSkuLocAssort.itemNotInSupplierAssort.error"),
	IUN_CORE_VALIDATIONRULE_CHECKSKULOCASSORT_SUPPLIERNOTPRIMARY_WARNING("iun.core.validationRule.checkSkuLocAssort.supplierNotPrimary.warning"),
	IUN_CORE_VALIDATIONRULE_CHECKSKULOCASSORT_ITEMWHSTOCKED_ERROR("iun.core.validationRule.checkSkuLocAssort.itemWarehouseStocked.error"),
	IUN_CORE_VALIDATIONRULE_CHECKSKULOCASSORT_NULLITEM_ERROR("iun.core.validationRule.nullItem.error"),
	
	IUN_CORE_VALIDATIONRULE_CHECKADDSKU_ITEMNOTINSTOREASSORT_ERROR("iun.core.validationRule.checkAddSku.itemNotInStoreAssort.error"),
	IUN_CORE_VALIDATIONRULE_CHECKADDSKU_ITEMNOTINSUPPLIERASSORT_ERROR("iun.core.validationRule.checkAddSku.itemNotInSupplierAssort.error"),
	IUN_CORE_VALIDATIONRULE_CHECKADDSKU_INVALIDITEM_ERROR("iun.core.validationRule.checkAddSku.invalidItem.error"),
	IUN_CORE_VALIDATIONRULE_CHECKADDSKU_SUPPLIERNOTPRIMARY_WARNING("iun.core.validationRule.checkAddSku.supplierNotPrimary.warning"),
	IUN_CORE_VALIDATIONRULE_CHECKADDSKU_NULLITEM_ERROR("iun.core.validationRule.nullItem.error"),
	IUN_CORE_VALIDATIONRULE_CHECKADDSKU_NONMATGOOD_ERROR("iun.core.validationRule.checkAddSku.itemNonMatGood.error"),
	
	IUN_CORE_VALIDATIONRULE_VERIFY_BARCODE_WRONG_LENGTH("iun.core.validationRule.verifyBarcode.wrongLength"),
	IUN_CORE_VALIDATIONRULE_VERIFY_BARCODE_WRONG_CHECK_DIGIT("iun.core.validationRule.verifyBarcode.wrongCheckDigit"),
	IUN_CORE_VALIDATIONRULE_VERIFY_BARCODE_VALIDATION_ERROR("iun.core.validationRule.verifyBarcode.validationError"),
	
	IUN_CORE_VALIDATIONRULE_ITEMEXPOSITORY_ITEMCOMPONENTLIST_ERROR("iun.core.validationRule.itemExpositoryCheckItemComponentList.error"),
	
	/***** TSFs *****/
	IUN_CORE_VALIDATIONRULE_TSF_CHECKADDSKU_ITEMNOTINDESTINATIONASSORT_WARNING("iun.core.validationRule.tsf.checkAddSku.itemNotInDestinationAssort.warning"),
	IUN_CORE_VALIDATIONRULE_TSF_CHECKADDSKU_ITEMNOTINDESTINATIONASSORT_ERROR("iun.core.validationRule.tsf.checkAddSku.itemNotInDestinationAssort.error"),
	IUN_CORE_VALIDATIONRULE_TSF_CHECKADDSKU_NULLITEM_ERROR("iun.core.validationRule.tsf.checkAddSku.nullItem.error"),
	IUN_CORE_VALIDATIONRULE_TSF_CHECKADDSKU_INVALIDITEM_ERROR("iun.core.validationRule.tsf.checkAddSku.invalidItem.error"),
	IUN_CORE_VALIDATIONRULE_TSF_CHECKADDSKU_MISSINGDESTINATIONASSORT_ERROR("iun.core.validationRule.tsf.checkAddSku.missingDestinationAssort.error"),
	IUN_CORE_VALIDATIONRULE_TSF_CHECKADDSKU_ITEMNOTINASSORT_ERROR("iun.core.validationRule.tsf.checkAddSku.itemNotInAssort.error"),
	IUN_CORE_VALIDATIONRULE_TSF_CHECKADDSKU_NONMATGOOD_ERROR("iun.core.validationRule.tsf.checkAddSku.itemNonMatGood.error"),
	
	/***** SCN *****/
	IUN_CORE_VALIDATION_RULE_SCN_RECIPE_QUANTITY_TOO_LARGE_ERROR("iun.core.validationRule.scn.recipeQuantity.tooLarge.error"),
	IUN_CORE_VALIDATION_RULE_SCN_RECIPE_QUANTITY_TOO_SMALL_ERROR("iun.core.validationRule.scn.recipeQuantity.tooSmall.error");
	
	private String failReason;

	private ValidationRulesFailCauseEnum(String failReason) {
		this.failReason = failReason;
	}
	
	public String getFailReason(){
		return failReason;
	}
	
	public static String getFailReasonMessageId(ValidationRulesFailCauseEnum validationRulesFailCauseEnum){
		return validationRulesFailCauseEnum.getFailReason();
	}
	
}
