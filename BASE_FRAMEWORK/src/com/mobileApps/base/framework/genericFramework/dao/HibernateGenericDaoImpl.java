package com.mobileApps.base.framework.genericFramework.dao;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;



public class HibernateGenericDaoImpl<T, ID extends Serializable> 
	extends HibernateDaoSupport 
	implements GenericDAO<T, ID> {

	
	@SuppressWarnings("unused")
	private static int START_RECORD_BEGINNING = 0;
	@SuppressWarnings("unused")
	private static int NO_MAX_RECORDS = -1;
	private Log log = LogFactory.getLog(this.getClass());  
	// Class to be persisted
	private Class<T> persistentClass;

//	@SuppressWarnings("unchecked")
	public HibernateGenericDaoImpl(){
//		this.persistentClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass())
//		.getActualTypeArguments()[0];
	}


	@SuppressWarnings("unchecked")
	public Class<T> getPersistentClass() {
		if(this.persistentClass == null)
			this.persistentClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass())
			.getActualTypeArguments()[0];
		return this.persistentClass;  
	}  


	public void delete(T entity) {  
		try {  
			getLog().trace("delete("+entity+")");
			getHibernateTemplate().setCheckWriteOperations(false);
			this.getHibernateTemplate().delete(entity);  
		} catch (final HibernateException ex) {  
			getLog().error(ex);  
			throw convertHibernateAccessException(ex);  
		}  
	}  

	public T findById(ID id) {  
		try {
			getLog().trace("findById("+id+")");
			return (T) this.getHibernateTemplate().get(getPersistentClass(), id);  
		} catch (final HibernateException ex) {  
			getLog().error(ex);  
			throw convertHibernateAccessException(ex);  
		}  
	}  


	public List<T> listAll() {  
		try {  
			return this.getHibernateTemplate().loadAll(getPersistentClass());  
		} catch (final HibernateException ex) {  
			getLog().error(ex);  
			throw convertHibernateAccessException(ex);  
		}  
	}  


	public T save(T entity) {
		getHibernateTemplate().setCheckWriteOperations(false);
		getLog().trace("save("+entity+")");
		try {  
			this.getHibernateTemplate().save(entity);  
			return entity;  
		} catch (final HibernateException ex) {  
			getLog().error(ex);  
			throw convertHibernateAccessException(ex);  
		}  
	}  

	@SuppressWarnings("unchecked")
	protected List<T> findByCriteria(Criterion... criterion) {  
		try {  
			Criteria crit = this.getHibernateTemplate()  
					.getSessionFactory()  
					.getCurrentSession()  
					.createCriteria(getPersistentClass());  
			for (Criterion c : criterion) {  
				crit.add(c);  
			}  
			return crit.list();  
		} catch (final HibernateException ex) {  
			getLog().error(ex);  
			throw convertHibernateAccessException(ex);  
		}  
	}



	public T load(ID id) {
		T entity = (T) getHibernateTemplate().load(getPersistentClass(), id);
		Hibernate.initialize(entity);
		return entity;
	}


	public T merge(T entity) {
		getHibernateTemplate().setCheckWriteOperations(false);
		return (T) getHibernateTemplate().merge(entity);
		
	}


	public void saveOrUpdate(T entity) {
		getHibernateTemplate().setCheckWriteOperations(false);
		getHibernateTemplate().saveOrUpdate(entity);
		
	}


	public void refresh(T entity) {
		getHibernateTemplate().refresh(entity);
	}


	public void evict(T entity) {
		getHibernateTemplate().evict(entity);
	}  

	@SuppressWarnings("unchecked")
	public List<T> findByOrderParam(List<String> orderFields, List<Boolean> asc){
		if(orderFields != null && asc != null)
			if(orderFields.size() != asc.size() ) {		//TODO Review
				getLog().error("Dimensioni dei liste dei parametri devono essere uguali");	
				throw new IllegalStateException("Errore imprevisto");
				//throw new RuntimeException("Parameter list sizes have to be equal");
			}
		DetachedCriteria criteria = DetachedCriteria.forClass(getPersistentClass());
		int i = 0;
		boolean isAsc = true;
		for (String string : orderFields) {
			isAsc = asc.get(i);
			if(isAsc)
				criteria.addOrder(Order.asc(string));
			else
				criteria.addOrder(Order.desc(string));
		}
		return getHibernateTemplate().findByCriteria(criteria);
	}
	
	@SuppressWarnings("unchecked")
	public  List<T> findByNamedParam(String query,
			Map<String, ?> params) throws DataAccessException {
		
		
		
		String[] paramNames = new String[params.size()];
		Object[] values = new Object[params.size()];
		
		List<String> keys = new ArrayList<String>(params.keySet());
		for(int i=0; i<keys.size(); i++){
			String k = keys.get(i);
			paramNames[i] = k;
			values[i] = params.get(k);
		}
		
		List<T> results = (List<T>) getHibernateTemplate().findByNamedParam(query, paramNames, values);
		return results;
		
	}
	
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public  List<T> findByNamedParam(final String query,
			final Map<String, ?> params, final Integer page,final Integer maxResults) throws DataAccessException {
		
		return (List<T>) getHibernateTemplate().execute(new HibernateCallback() {
			
			public Object doInHibernate(Session session) throws HibernateException,
					SQLException {
				
				
				Query hQuery = getSession().createQuery(query);
				String value = "";
				for (String param : params.keySet()) {
					value = (String) params.get(param);
					hQuery.setParameter(param, value);
				}
				if(page != null && maxResults != null){
					hQuery.setFirstResult(page*maxResults);
					hQuery.setMaxResults(maxResults);
				}
				return hQuery.list();
			}
		});
	}
	
	/*
	
	@SuppressWarnings("unchecked")
	public List<T> findByNamedQueryAndNamedParam( String queryName, String[] paramNames, Object[] values) throws DataAccessException {

		List<T> results = (List<T>) getHibernateTemplate().findByNamedQueryAndNamedParam(queryName, paramNames, values);
		return results;
	}

	public List<T> findByNamedQueryAndNamedParam( String queryName, Map<String, ?> params) throws DataAccessException {

		String[] paramNames = new String[params.size()];
		Object[] values = new Object[params.size()];
		
		List<String> keys = new ArrayList<String>(params.keySet());
		for(int i=0; i<keys.size(); i++){
			String k = keys.get(i);
			paramNames[i] = k;
			values[i] = params.get(k);
		}
		
		return this.findByNamedQueryAndNamedParam(queryName, paramNames, values);
	}

	@SuppressWarnings("unchecked")
	public List<T> findByNamedParam(Class<T> entityClass, String query,
			String[] paramNames, Object[] values) throws DataAccessException {
		
		List<T> results = (List<T>) getHibernateTemplate().findByNamedParam(query, paramNames, values);
		return results;
		
	}

	@SuppressWarnings("unchecked")
	public  List<T> findByNamedParam(String query,
			Map<String, ?> params) throws DataAccessException {
		
		String[] paramNames = new String[params.size()];
		Object[] values = new Object[params.size()];
		
		List<String> keys = new ArrayList<String>(params.keySet());
		for(int i=0; i<keys.size(); i++){
			String k = keys.get(i);
			paramNames[i] = k;
			values[i] = params.get(k);
		}
		
		List<T> results = (List<T>) getHibernateTemplate().findByNamedParam(query, paramNames, values);
		return results;
		
	}
	*/
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<T> searchByMultipleColumns(final List<String> uxColumns, final List<Object> values, final List<String> uxOrderColumns, final List<Boolean> orderModes, final LogicalOperator logicOp, final Integer startResult, final Integer maxResults) {

		return (List<T>) getHibernateTemplate().execute(new HibernateCallback() {
			
			
			public Object doInHibernate(Session session) throws HibernateException,
					SQLException {
				Map<String, Object> parameters = new LinkedHashMap<String, Object>();
				
				String oper = "";
				if(logicOp == null)
					oper = "OR";
				else {
					switch (logicOp) {
					case OR:
						oper = "OR";
						break;

					case AND:
						oper = "AND";
						break;
					}
				}
				String entityClassName = getPersistentClass().getSimpleName();
				StringBuffer buffer = new StringBuffer();
				buffer.append(" SELECT  ").append(getAlias());
				buffer.append(" FROM ").append(entityClassName).append(" ").append(getAlias());


				if (uxColumns != null && values != null) {
					
					Iterator<String> uxColumnsIter = uxColumns.iterator();
					String uxColumn = null, currentFieldName = null, currentParmName = null;
					Object value = null;
					Iterator<Object> valuesIter = values.iterator();
					boolean isFirst = true;

					while (uxColumnsIter.hasNext()) {
						uxColumn = uxColumnsIter.next();
						value = valuesIter.next();

						currentFieldName = uxColumn;

						if (currentFieldName != null && value != null && !"".equals(value))
						{
							
							currentParmName = currentFieldName.replace('.', '_');
							currentFieldName = getAlias()+"."+currentFieldName;

							if (value instanceof String)
								parameters.put(currentParmName , "%" + ((String) value).toUpperCase().trim() + "%");
							else 
								parameters.put(currentParmName, value);

							if (isFirst) {
								buffer.append(" WHERE ");
								buffer.append(" (");
								isFirst = false;
							} else
								buffer.append(" ").append(oper).append(" ");

							if (value instanceof String) {	
								
								buffer.append("upper(" + currentFieldName+ ")");
								buffer.append(" LIKE :");
								buffer.append(currentParmName);
								
							} else {
								
								buffer.append(currentFieldName);
								buffer.append(" = :");
								buffer.append(currentParmName);
							}
						}
					}
					
					if(!isFirst)
						buffer.append(")");
				}

				// ORDER BY
				if (uxOrderColumns != null) {
					Iterator<String> orderUXColIter = uxOrderColumns.iterator();
					Iterator<Boolean> orderModeIter = orderModes.iterator();
					String currentUXCol = null, currentFieldName = null;
					boolean isFirst = true;

					while (orderUXColIter.hasNext()) {
						currentUXCol = orderUXColIter.next();

						currentFieldName = currentUXCol;

						if (currentFieldName != null) {

							if (isFirst) {
								buffer.append(" ORDER BY ");
								isFirst = false;
							} else
								buffer.append(", ");

							buffer.append(getAlias()).append(".").append(currentFieldName);

							if (!orderModeIter.next())
								buffer.append(" DESC");
						}
					}
				}

				// Creates RowList
				Query q = getSession().createQuery(buffer.toString());
//				list = queryList(buffer.toString(), parameters, startResult, maxResults);
				if (parameters != null && !parameters.isEmpty())
				{
					Iterator<String> idIter = parameters.keySet().iterator();
					Iterator<Object> valueIter = parameters.values().iterator();
					Object currentValue = null;

					while (idIter.hasNext())
					{
						currentValue = valueIter.next();

						q.setParameter(idIter.next(), currentValue);
					}
				}

				
				if (startResult != null) {
					q.setFirstResult(startResult);
				}
				
				if (maxResults != null) {
					q.setMaxResults(maxResults);
				}
				return q.list();
			}

			private String getAlias() {
				return "e";
			}
		});
		
		
	}
	
	public void flush(){
		getHibernateTemplate().flush();
	}
	
	@SuppressWarnings("unchecked")
	public Long searchByMultipleColumnsCount(final List<String> uxColumns, final List<Object> values) {
		return (Long) getHibernateTemplate().execute(new HibernateCallback() {
			
			public Object doInHibernate(Session session) throws HibernateException,
					SQLException {
				Criteria crit = getSession().createCriteria(getPersistentClass());
				
				String uxColumn = null;
				String fieldName = null;
				Object value = null;

						
				Disjunction orDisjunction = Restrictions.disjunction();
				
				if (uxColumns != null) {
				
					Iterator<String> uxColumnsIter = uxColumns.iterator();
					Iterator<Object> valuesIter = values.iterator();
			
					while(uxColumnsIter.hasNext())
					{
						uxColumn = uxColumnsIter.next();
						value = valuesIter.next();
						
						if(uxColumn != null && value != null)
						{
							fieldName = uxColumn;
							
							if(fieldName != null) { 
								
								if (value instanceof String)
									orDisjunction.add(Restrictions.ilike(fieldName, "%" + ((String) value).trim() + "%"));
								else
									orDisjunction.add(Restrictions.eq(fieldName, value));
							}
						}
					}
				}
				
				if (uxColumns != null && !uxColumns.isEmpty())
					crit.add(orDisjunction);

				
				crit.setProjection(Projections.rowCount());
				return ((Integer) crit.uniqueResult()).longValue();
			}
		});
		
	}
	
	public void deleteById(ID id){
		T entity = findById(id);
		delete(entity);
	}
	
	// ********* getters and setters **********


	protected Log getLog() {
		return log;
	}


	public void setLog(Log log) {
		this.log = log;
	}


	@Override
	public void persist(T entity) {
		getHibernateTemplate().persist(entity);
	}
	

	public boolean exists(ID pk) {
		@SuppressWarnings("unchecked")
		T entity = (T) getSession().get(getPersistentClass(), pk);
		return entity == null ? false : true;
	}
	
	public Long getRowCount(){
		return ((Integer) getSession().createCriteria(getPersistentClass())
						   		  	  .setProjection(Projections.rowCount())
						   		  	  .uniqueResult())
						   		  	  .longValue();
	}

	public void clear(){
		getHibernateTemplate().clear();
	}
	
}
