package com.luomo.event.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.springframework.jdbc.core.RowMapper;

import com.luomo.event.domain.Feed;

public class FeedsRowMapper 
	implements RowMapper{

	@Override
	public Object mapRow(ResultSet resultSet, 
					     int rowNumber) throws SQLException {

		Feed feed = new Feed();
		feed.setId(new Long(resultSet.getInt("id")));
		feed.setName(resultSet.getString("name"));
		feed.setUrl(resultSet.getString("url"));
		feed.setConfigFileName(resultSet.getString("configFileName"));
		feed.setConfigFileLocation(resultSet.getString("configFileLocation"));
		feed.setMethod(resultSet.getString("method"));
		feed.setStatus(resultSet.getInt("status"));
	
		
		return feed;
	}

}
