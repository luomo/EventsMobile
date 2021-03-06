package com.mobileApps.server.ws.resources;

import java.net.URI;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriBuilder;
import javax.xml.bind.JAXBException;

import junit.framework.Assert;

import org.junit.Test;

import com.mobileApps.server.domain.Artist;
import com.mobileApps.server.domain.Event;
import com.mobileApps.server.domain.Location;
import com.mobileApps.server.domain.Venue;
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

	//@Test
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
	//@Test
	public void testPostEventById() throws JAXBException {
		ClientConfig config = new DefaultClientConfig();
		Client client = Client.create(config);
		
		Calendar tomorowCal = Calendar.getInstance();
		tomorowCal.add(Calendar.DAY_OF_YEAR, 1);
		Date tomorowDate = tomorowCal.getTime();
		
		tomorowDate = new Date();
		
		Location locationLisboa = new Location("Lisboa", "co", "Avenida lx", "2000", 12f, -34.5f);
		Venue venueLisboa = new Venue(EventService.getNextVenueId(), "Lx place", locationLisboa, "www.xpto.com", "212272000", null);
		//Venue venueLisboa = new Venue(null, "New Lx place", locationLisboa, "www.xpto.com", "212272000", null);
		
		WebResource service = client.resource(getBaseURI());
		
		Venue venue =  service.path("venue")
				.type(MediaType.APPLICATION_JSON)
				.post(Venue.class, venueLisboa);
		
		
		Artist artist = new Artist(EventService.getNextArtistId(), "new artist");
		Event event = new Event(EventService.getNextEventId(), "Music - Event 1", tomorowDate, "Music event", null, "12", 12F,"tag", 1,1L, new Date(), "url", artist, venueLisboa);
		
//		for (int i = 0; i < 50; i++) {
			service = client.resource(getBaseURI());
			
			Event resp =  service.path("events").path("event")
					.type(MediaType.APPLICATION_JSON)
					.post(Event.class, event);
			
			
			Assert.assertNotNull(resp.getId());
			
//		}
		
	}
}
