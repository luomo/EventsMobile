package com.mobileApps.base.framework.genericFramework.jmxBean;

import javax.naming.InitialContext;
import javax.naming.NameNotFoundException;
import javax.naming.NamingException;
import javax.naming.Reference;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.hibernate.impl.SessionFactoryObjectFactory;
import org.hibernate.jmx.StatisticsServiceMBean;
import org.hibernate.stat.CollectionStatistics;
import org.hibernate.stat.EntityStatistics;
import org.hibernate.stat.QueryStatistics;
import org.hibernate.stat.SecondLevelCacheStatistics;
import org.hibernate.stat.Statistics;
import org.hibernate.stat.StatisticsImpl;
import org.springframework.jmx.export.annotation.ManagedAttribute;
import org.springframework.jmx.export.annotation.ManagedOperation;
import org.springframework.jmx.export.annotation.ManagedResource;

@ManagedResource
public class BaseHibernateStatisticsMBean {



	private SessionFactory sf;
	private  String sfJNDIName;
	private  Log log = LogFactory.getLog(BaseHibernateStatisticsMBean.class);
	private Statistics stats = new StatisticsImpl();

	/**
	 * @see StatisticsServiceMBean#setSessionFactoryJNDIName(java.lang.String)
	 */
	public void setSessionFactoryJNDIName(String sfJNDIName) {
		this.sfJNDIName = sfJNDIName;
		try {
			Object obj = new InitialContext().lookup(sfJNDIName);
			if (obj instanceof Reference) {
				Reference ref = (Reference) obj;
				setSessionFactory( (SessionFactory) SessionFactoryObjectFactory.getInstance( (String) ref.get(0).getContent() ) );
			}
			else {
				setSessionFactory( (SessionFactory) obj );
			} 
		} 
		catch (NameNotFoundException e) {
			log.error("No session factory with JNDI name " + sfJNDIName, e);
			setSessionFactory(null);
		} 
		catch (NamingException e) {
			log.error("Error while accessing session factory with JNDI name " + sfJNDIName, e);
			setSessionFactory(null);
		} 
		catch (ClassCastException e) {
			log.error("JNDI name " + sfJNDIName + " does not handle a session factory reference", e);
			setSessionFactory(null);
		}
	}
	
	/**
	 * Useful to init this MBean wo a JNDI session factory name
	 * 
	 * @param sf session factory to register
	 */
	public void setSessionFactory(SessionFactory sf) {
		this.sf = sf;
		if (sf == null) {
			stats = new StatisticsImpl();
		}
		else {
			stats = sf.getStatistics(); 
		}
		
	}
	/**
	 * @see StatisticsServiceMBean#clear()
	 */
	@ManagedOperation
	public void clear() {
		stats.clear();
	}
	/**
	 * @see StatisticsServiceMBean#getEntityStatistics(java.lang.String)
	 */
	@ManagedOperation
	public EntityStatistics getEntityStatistics(String entityName) {
		return stats.getEntityStatistics(entityName);
	}
	/**
	 * @see StatisticsServiceMBean#getCollectionStatistics(java.lang.String)
	 */
	@ManagedOperation
	public CollectionStatistics getCollectionStatistics(String role) {
		return stats.getCollectionStatistics(role);
	}
	/**
	 * @see StatisticsServiceMBean#getSecondLevelCacheStatistics(java.lang.String)
	 */
	@ManagedOperation
	public SecondLevelCacheStatistics getSecondLevelCacheStatistics(String regionName) {
		return stats.getSecondLevelCacheStatistics(regionName);
	}
	/**
	 * @see StatisticsServiceMBean#getQueryStatistics(java.lang.String)
	 */
	@ManagedOperation
	public QueryStatistics getQueryStatistics(String hql) {
		return stats.getQueryStatistics(hql);
	}
	/**
	 * @see StatisticsServiceMBean#getEntityDeleteCount()
	 */
	@ManagedAttribute
	public long getEntityDeleteCount() {
		return stats.getEntityDeleteCount();
	}
	/**
	 * @see StatisticsServiceMBean#getEntityInsertCount()
	 */
	@ManagedAttribute
	public long getEntityInsertCount() {
		return stats.getEntityInsertCount();
	}
	/**
	 * @see StatisticsServiceMBean#getEntityLoadCount()
	 */
	@ManagedAttribute
	public long getEntityLoadCount() {
		return stats.getEntityLoadCount();
	}
	/**
	 * @see StatisticsServiceMBean#getEntityFetchCount()
	 */
	@ManagedAttribute
	public long getEntityFetchCount() {
		return stats.getEntityFetchCount();
	}
	/**
	 * @see StatisticsServiceMBean#getEntityUpdateCount()
	 */
	@ManagedAttribute
	public long getEntityUpdateCount() {
		return stats.getEntityUpdateCount();
	}
	/**
	 * @see StatisticsServiceMBean#getQueryExecutionCount()
	 */
	@ManagedAttribute
	public long getQueryExecutionCount() {
		return stats.getQueryExecutionCount();
	}
	@ManagedAttribute
	public long getQueryCacheHitCount() {
		return stats.getQueryCacheHitCount();
	}
	@ManagedAttribute
	public long getQueryExecutionMaxTime() {
		return stats.getQueryExecutionMaxTime();
	}
	@ManagedAttribute
	public long getQueryCacheMissCount() {
		return stats.getQueryCacheMissCount();
	}
	@ManagedAttribute
	public long getQueryCachePutCount() {
		return stats.getQueryCachePutCount();
	}
	/**
	 * @see StatisticsServiceMBean#getFlushCount()
	 */
	@ManagedAttribute
	public long getFlushCount() {
		return stats.getFlushCount();
	}
	/**
	 * @see StatisticsServiceMBean#getConnectCount()
	 */
	@ManagedAttribute
	public long getConnectCount() {
		return stats.getConnectCount();
	}
	/**
	 * @see StatisticsServiceMBean#getSecondLevelCacheHitCount()
	 */
	@ManagedAttribute
	public long getSecondLevelCacheHitCount() {
		return stats.getSecondLevelCacheHitCount();
	}
	/**
	 * @see StatisticsServiceMBean#getSecondLevelCacheMissCount()
	 */
	@ManagedAttribute
	public long getSecondLevelCacheMissCount() {
		return stats.getSecondLevelCacheMissCount();
	}
	/**
	 * @see StatisticsServiceMBean#getSecondLevelCachePutCount()
	 */
	@ManagedAttribute
	public long getSecondLevelCachePutCount() {
		return stats.getSecondLevelCachePutCount();
	}
	/**
	 * @see StatisticsServiceMBean#getSessionCloseCount()
	 */
	@ManagedAttribute
	public long getSessionCloseCount() {
		return stats.getSessionCloseCount();
	}
	/**
	 * @see StatisticsServiceMBean#getSessionOpenCount()
	 */
	@ManagedAttribute
	public long getSessionOpenCount() {
		return stats.getSessionOpenCount();
	}
	/**
	 * @see StatisticsServiceMBean#getCollectionLoadCount()
	 */
	@ManagedAttribute
	public long getCollectionLoadCount() {
		return stats.getCollectionLoadCount();
	}
	/**
	 * @see StatisticsServiceMBean#getCollectionFetchCount()
	 */
	@ManagedAttribute
	public long getCollectionFetchCount() {
		return stats.getCollectionFetchCount();
	}
	/**
	 * @see StatisticsServiceMBean#getCollectionUpdateCount()
	 */
	@ManagedAttribute
	public long getCollectionUpdateCount() {
		return stats.getCollectionUpdateCount();
	}
	/**
	 * @see StatisticsServiceMBean#getCollectionRemoveCount()
	 */
	@ManagedAttribute
	public long getCollectionRemoveCount() {
		return stats.getCollectionRemoveCount();
	}
	/**
	 * @see StatisticsServiceMBean#getCollectionRecreateCount()
	 */
	@ManagedAttribute
	public long getCollectionRecreateCount() {
		return stats.getCollectionRecreateCount();
	}
	/**
	 * @see StatisticsServiceMBean#getStartTime()
	 */
	@ManagedAttribute
	public long getStartTime() {
		return stats.getStartTime();
	}

	/**
	 * @see StatisticsServiceMBean#isStatisticsEnabled()
	 */
	@ManagedAttribute
	public boolean isStatisticsEnabled() {
		return stats.isStatisticsEnabled();
	}

	/**
	 * @see StatisticsServiceMBean#setStatisticsEnabled(boolean)
	 */
	@ManagedOperation
	public void enableStatistics() {
		stats.setStatisticsEnabled(true);
	}
	
	@ManagedOperation
	public void disableStatistics() {
		stats.setStatisticsEnabled(false);
	}
	
	@ManagedOperation
	public void logSummary() {
		stats.logSummary();
	}
	@ManagedAttribute
	public String[] getCollectionRoleNames() {
		return stats.getCollectionRoleNames();
	}
	@ManagedAttribute
	public String[] getEntityNames() {
		return stats.getEntityNames();
	}
	@ManagedAttribute
	public String[] getQueries() {
		return stats.getQueries();
	}

	@ManagedAttribute
	public String[] getSecondLevelCacheRegionNames() {
		return stats.getSecondLevelCacheRegionNames();
	}
	
	@ManagedAttribute
	public long getSuccessfulTransactionCount() {
		return stats.getSuccessfulTransactionCount();
	}
	
	@ManagedAttribute
	public long getTransactionCount() {
		return stats.getTransactionCount();
	}

	@ManagedAttribute
	public long getCloseStatementCount() {
		return stats.getCloseStatementCount();
	}
	@ManagedAttribute
	public long getPrepareStatementCount() {
		return stats.getPrepareStatementCount();
	}

	@ManagedAttribute
	public long getOptimisticFailureCount() {
		return stats.getOptimisticFailureCount();
	}

	@ManagedAttribute
	public String getQueryExecutionMaxTimeQueryString() {
		return stats.getQueryExecutionMaxTimeQueryString();
	}

	
	// *************** getters and setters **************
//
//	public SessionFactory getSessionFactory() {
//		return sessionFactory;
//	}
//
//	public void setSessionFactory(SessionFactory sessionFactory) {
//		this.sessionFactory = sessionFactory;
//	}
//	
//	
	
	
	
	
}
