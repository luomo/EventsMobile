package com.mobileApps.server.ws.resources;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.mobileApps.server.ws.domain.Artist;
import com.mobileApps.server.ws.domain.Event;
import com.mobileApps.server.ws.domain.Location;

@Path("/events")
public class EventResource {

	@GET
	@Path("/city")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<Event> getEventsByCity(){
		
		List<Event> eventList = new ArrayList<Event>();
		
		Event event = new Event();
		event.setTitle("Dummy Event");
		event.setDescription("Dummy Event Description");
		event.setAttendance("100");
		event.setWebsite("www.xpto.pt");
		
		Artist artist = new Artist();
		artist.setArtist("Artist name");
		
		Location location = new Location();
		location.setCity("braga");
		location.setCountry("pt");
		location.setLatitude(12f);
		location.setLongitude(48.5f);
		location.setPostalCode("4705-097");
		location.setStreet("Avenida Liberdade");
		
		event.setArtists(artist);
		event.setLocation(location);
		
		
		eventList.add(event);
		return eventList;
	}
}
