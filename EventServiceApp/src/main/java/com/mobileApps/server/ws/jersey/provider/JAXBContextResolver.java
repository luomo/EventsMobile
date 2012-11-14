package com.mobileApps.server.ws.jersey.provider;

import javax.xml.bind.JAXBContext;

import com.mobileApps.server.domain.Artist;
import com.mobileApps.server.domain.Event;
import com.mobileApps.server.domain.Feed;
import com.mobileApps.server.domain.Location;
import com.mobileApps.server.domain.Provider;
import com.mobileApps.server.domain.UserInfo;
import com.mobileApps.server.domain.Venue;
import com.mobileApps.server.ws.wsDTOs.EventsByCityDto;
import com.sun.jersey.api.json.JSONConfiguration;
import com.sun.jersey.api.json.JSONJAXBContext;

/* http://weblogs.java.net/blog/felipegaucho/archive/2010/02/25/jersey-feat-jquery-jsonp
 * Jersey is one of most friendly API in the Glassfish portfolio, but there is a tweak that bothers me 
 * since the first day I tried to serialize JAXB annotated objects in JSON format. 
 * If you use attributes in your JAXB objects, the JSON notation will receive an @ symbol in front of it, 
 * a non-standard javascript notation that will brake libraries like jQuery. 
 * The workaround is provided by the Jersey itself, in format of a ContextResolver class. 
 * So, in order to have natural JSON notation in your web-service you need to create a class like 
 * the one below. You can find the real code used in the Arena here, and you can also check more information about ContextResolver and JSON natural notation in Jersey here.
 */

@javax.ws.rs.ext.Provider
public class JAXBContextResolver {

	private JAXBContext context;
	private Class[] types = {Event.class, 
							 Artist.class, 
							 Feed.class,
							 Location.class, 
							 Provider.class, 
							 Venue.class, 
							 EventsByCityDto.class, 
							 UserInfo.class};

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
