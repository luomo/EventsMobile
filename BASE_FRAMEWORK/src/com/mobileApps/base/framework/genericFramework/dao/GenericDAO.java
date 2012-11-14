package com.mobileApps.base.framework.genericFramework.dao;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;

public interface GenericDAO<T, ID extends Serializable> {  

	public T findById(ID id);  
	public List<T> listAll();  
	public T save(T entity);
	public void persist(T entity);
	public void delete(T entity);  
	public T load(ID id);
	public T merge(T entity);
	public void saveOrUpdate(T entity);
	public void refresh(T entity);
	public void evict(T entity);
	public List<T> findByOrderParam(List<String> orderFields, List<Boolean> asc);
	public  List<T> findByNamedParam(String query, Map<String, ?> params) throws DataAccessException ;
	public  List<T> findByNamedParam(final String query,
			final Map<String, ?> params, final Integer page,final Integer maxResults) throws DataAccessException ;
	public List<T> searchByMultipleColumns(List<String> uxColumns, List<Object> values, List<String> uxOrderColumns, List<Boolean> orderModes, LogicalOperator logicOp,Integer startResult, Integer maxResults);
	public Long searchByMultipleColumnsCount(final List<String> uxColumns, final List<Object> values);
	public void flush();
	public void deleteById(ID id);
	public boolean exists(ID pk);
	public Long getRowCount();
	public void clear();
} 
