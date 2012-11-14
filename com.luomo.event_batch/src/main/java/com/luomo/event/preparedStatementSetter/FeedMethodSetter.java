package com.luomo.event.preparedStatementSetter;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class FeedMethodSetter 
	implements PreparedStatementSetter{

	private String method;

	@Override
	public void setValues(PreparedStatement ps) 
			throws SQLException {
		ps.setString(1, method);
	}

	public void setMethod(String method) {
		this.method = method;
	}
	
	

}
