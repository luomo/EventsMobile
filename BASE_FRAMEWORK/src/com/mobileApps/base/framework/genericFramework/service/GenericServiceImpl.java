package com.mobileApps.base.framework.genericFramework.service;

import java.io.Serializable;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mobileApps.base.framework.genericFramework.dao.GenericDAO;
import com.mobileApps.base.framework.genericFramework.dao.LogicalOperator;
import com.mobileApps.base.framework.genericFramework.ruleProcessor.ruleProcessor.IRuleProcessor;


@Transactional(
		propagation = Propagation.REQUIRED,
		isolation = Isolation.DEFAULT,
		readOnly = true, 
		rollbackFor = RuntimeException.class
)
public abstract class GenericServiceImpl<T, PK extends Serializable, D extends GenericDAO<T,PK>>  
	implements GenericService<T, PK>{

	
	private IRuleProcessor ruleProcessor;
	private D genericDao;
	private Log log = LogFactory.getLog(this.getClass());
	
	public GenericServiceImpl(){}
	
	
	public GenericServiceImpl(D dao, IRuleProcessor ruleProcessor){
		this.genericDao = dao;
		this.ruleProcessor = ruleProcessor;
	}
	
	
	@Transactional( propagation = Propagation.SUPPORTS, isolation = Isolation.DEFAULT, readOnly = true )
	public T findById(PK id) {	
		return getGenericDao().findById(id);
	}

	@Transactional( propagation = Propagation.SUPPORTS, isolation = Isolation.DEFAULT, readOnly = true )
	public List<T> listAll() {
		return getGenericDao().listAll();
	}

	@Transactional( propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, readOnly = false )
	public T save(T entity) {
		return getGenericDao().save(entity);
	}

	@Transactional( propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, readOnly = false )
	public void delete(T entity) {	
		getGenericDao().delete(entity);
	}

	@Transactional( propagation = Propagation.SUPPORTS, isolation = Isolation.DEFAULT, readOnly = true )
	public T load(PK id) {
		return getGenericDao().load(id);
	}

	@Transactional( propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, readOnly = false )
	public T merge(T entity) {
		return getGenericDao().merge(entity);
	}

	@Transactional( propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, readOnly = false )
	public void saveOrUpdate(T entity) {
		getGenericDao().saveOrUpdate(entity);
		
	}

	@Transactional( propagation = Propagation.SUPPORTS, isolation = Isolation.DEFAULT, readOnly = true )
	public List<T> searchByMultipleColumns(List<String> uxColumns,
			List<Object> values, List<String> uxOrderColumns,
			List<Boolean> orderModes, LogicalOperator op, Integer startResult, Integer maxResults) {
		return getGenericDao().searchByMultipleColumns(uxColumns, values, uxOrderColumns, orderModes, op, startResult, maxResults);
	}

	@Transactional( propagation = Propagation.SUPPORTS, isolation = Isolation.DEFAULT, readOnly = true )
	public Long searchByMultipleColumnsCount(List<String> uxColumns,
			List<Object> values) {
		return getGenericDao().searchByMultipleColumnsCount(uxColumns, values);
	}




	@Transactional( propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, readOnly = false )
	public void refresh(T entity){
		getGenericDao().refresh(entity);
	}
	
	@Transactional( propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, readOnly = false )
	public void deleteById(PK id) {
		getGenericDao().deleteById(id);
	}

	@Override
	@Transactional( propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, readOnly = false )
	public void flushChanges() {
		getGenericDao().flush();		
	}

	@Override
	@Transactional( propagation = Propagation.SUPPORTS, isolation = Isolation.DEFAULT, readOnly = true )
	public void evict(T entity) {
		getGenericDao().evict(entity);
	}

	@Override
	@Transactional( propagation = Propagation.SUPPORTS, isolation = Isolation.DEFAULT, readOnly = true )
	public boolean exists(PK pk) {
		return getGenericDao().exists(pk);
	}

	@Override
	@Transactional( propagation = Propagation.SUPPORTS, isolation = Isolation.DEFAULT, readOnly = true )
	public Long getRowCount() {
		return getGenericDao().getRowCount();
	}

	@Override
	@Transactional( propagation = Propagation.SUPPORTS, isolation = Isolation.DEFAULT, readOnly = true )
	public void clear() {
		getGenericDao().clear();
	}
	
	


	// ********* getters and Setters ************
	
	protected IRuleProcessor getRuleProcessor() {
		return ruleProcessor;
	}

	public void setRuleProcessor(IRuleProcessor ruleProcessor) {
		this.ruleProcessor = ruleProcessor;
	}

	
	public D getGenericDao() {
		return genericDao;
	}

	public void setGenericDao(D genericDao) {
		this.genericDao = genericDao;
	}

	protected Log getLog() {
		return log;
	}

	public void setLog(Log log) {
		this.log = log;
	}
}
