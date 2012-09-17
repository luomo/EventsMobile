package com.mobileApps.server.ws.provider;

import javax.xml.bind.JAXBContext;

import com.mobileApps.server.ws.domain.Artist;
import com.mobileApps.server.ws.domain.Event;
import com.mobileApps.server.ws.domain.Feed;
import com.mobileApps.server.ws.domain.Location;
import com.mobileApps.server.ws.domain.Provider;
import com.mobileApps.server.ws.domain.Venue;
import com.sun.jersey.api.json.JSONConfiguration;
import com.sun.jersey.api.json.JSONJAXBContext;

public class JAXBContextResolver {

	private JAXBContext context;
	private Class[] types = {Event.class, 
							 Artist.class, 
							 Feed.class,
							 Location.class, 
							 Provider.class, 
							 Venue.class};

	public JAXBContextResolver() throws Exception {
		this.context = 
				new JSONJAXBContext( 
						JSONConfiguration.natural().build(), types);
	}

	public JAXBContext getContext(Class<?> objectType) {
		for (Class type : types) {
			if (type == objectType) {
				return context;
			}
		}
		return null;
	}
}
