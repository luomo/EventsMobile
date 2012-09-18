package com.mobileApps.server.ws.resources;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.mobileApps.server.ws.domain.Artist;
import com.mobileApps.server.ws.domain.Event;
import com.mobileApps.server.ws.domain.Location;

@Path("/events")
public class EventResource {


	
	@GET
	@Path("/city")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response getEventsByCity(){
		
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
		return Response.ok(eventList).header("Access-Control-Allow-Origin", "*")
									 .build();
									 //.header("Content-Type", "application/json")
		
	}

	@GET
	@Path("/location")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response getExistentLocations(){
		
		List<Location> locationList = new ArrayList<Location>();
		
		
		
		Location location = new Location();
		location.setCity("braga");
		location.setCountry("pt");
		location.setLatitude(12f);
		location.setLongitude(48.5f);
		location.setPostalCode("4705-097");
		locationList.add(location);

		location = new Location();
		location.setCity("porto");
		location.setCountry("pt");
		location.setLatitude(78f);
		location.setLongitude(10f);
		location.setPostalCode("3500");

		return Response.ok(locationList).header("Access-Control-Allow-Origin", "*")
				 					    .build();
	}
}
