package com.mobileApps.server.ws.resources;

import java.net.URI;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriBuilder;
import javax.xml.bind.JAXBException;

import junit.framework.Assert;

import org.junit.Test;

import com.mobileApps.server.ws.domain.Event;
import com.mobileApps.server.ws.service.EventService;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.GenericType;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.api.client.config.DefaultClientConfig;


public class EventResourceTestCase {//extends JerseyTest {


	private static URI getBaseURI() {
		return UriBuilder.fromUri(
				"http://localhost:8080/EventServiceApp/resources/").build();
	}
	
//	@Test
	public void testEvents() throws JAXBException {
		ClientConfig config = new DefaultClientConfig();
		Client client = Client.create(config);
		WebResource service = client.resource(getBaseURI());
		@SuppressWarnings("unchecked")
		List<Event> res = service.path("events")
							   .path("city")
							   .accept(MediaType.APPLICATION_JSON)
							   .get(new GenericType< List<Event>>(){} );
		
        Assert.assertEquals(res.size(), EventService.getAllEvents().size());
	}

	@Test
	public void testGetEventById() throws JAXBException {
		ClientConfig config = new DefaultClientConfig();
		Client client = Client.create(config);
		
		Long eventId = new Long(1);
		
		WebResource service = client.resource(getBaseURI());
		Event res = service.path("events")
							.path(eventId.toString())
						   .accept(MediaType.APPLICATION_JSON)
						   .get(Event.class);
		
		
		Assert.assertEquals(res.getId(), EventService.getEventsById(eventId).getId());
	}
}
