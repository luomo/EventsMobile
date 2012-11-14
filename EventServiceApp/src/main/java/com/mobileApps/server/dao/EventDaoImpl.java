package com.mobileApps.server.dao;

import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.type.StandardBasicTypes;

import com.mobileApps.base.framework.genericFramework.dao.HibernateGenericDaoImpl;
import com.mobileApps.server.domain.Event;


public class EventDaoImpl
	extends HibernateGenericDaoImpl<Event, Long>
	implements IEventDao{

	@SuppressWarnings("unchecked")
	@Override
	public List<Event> findEventListBasedOnGeoLocation(
			Float latitude,
			Float longitude, 
			Integer distanceToSearch,
			Integer numberOfEventToReturn) {
		
		StringBuilder sql = new StringBuilder(); 
		sql.append(" SELECT e.*,");
		sql.append(" ( 6371 * acos( cos( radians(:latitude) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians( :longitude) ) + sin( radians(:latitude) ) * sin( radians( latitude ) ) ) ) AS distance ");
		sql.append(" FROM EVENT e JOIN VENUE v ON e.venue_fk = v.id ");
		sql.append(" HAVING distance < :distance ");
		sql.append(" ORDER BY distance LIMIT 0 , :resultNbr");
		
		
		SQLQuery query = getSession().createSQLQuery(sql.toString());
		query.setParameter("latitude", latitude, StandardBasicTypes.FLOAT);
		query.setParameter("longitude", longitude, StandardBasicTypes.FLOAT);
		query.setParameter("distance", distanceToSearch, StandardBasicTypes.INTEGER);
		query.setParameter("resultNbr", numberOfEventToReturn, StandardBasicTypes.INTEGER);
		query.addEntity(Event.class);

		return query.list();
	}

}
