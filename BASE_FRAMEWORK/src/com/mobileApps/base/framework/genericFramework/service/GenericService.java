package com.mobileApps.base.framework.genericFramework.service;

import java.io.Serializable;
import java.util.List;

import com.mobileApps.base.framework.genericFramework.dao.LogicalOperator;


public interface GenericService<T, PK extends Serializable> {

	public T findById(PK id);  
	public List<T> listAll();  
	public T save(T entity);  
	public void delete(T entity);  
	public T load(PK id);
	public T merge(T entity);
	public void saveOrUpdate(T entity);
	public void refresh(T entity);
	public void flushChanges();
	public void evict(T entity);
	public List<T> searchByMultipleColumns(List<String> uxColumns, List<Object> values, List<String> uxOrderColumns, List<Boolean> orderModes, LogicalOperator logicOp, Integer startResult, Integer maxResults);
	public Long searchByMultipleColumnsCount(final List<String> uxColumns, final List<Object> values);
	public void deleteById(PK id);
	public boolean exists(PK pk);
	public Long getRowCount();
	public void clear();
}
