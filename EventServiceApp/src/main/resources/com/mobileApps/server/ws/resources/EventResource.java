package com.mobileApps.server.ws.resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.mobileApps.server.ws.service.EventService;

@Path("/events")
public class EventResource {


	private EventService eventService;
	
	@GET
	@Path("/city")
	@SuppressWarnings("static-access")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response getEventsByCity(){		
		
		return Response.ok(eventService.getAllEvents()).header("Access-Control-Allow-Origin", "*")
									 .build();
									 //.header("Content-Type", "application/json")
		
	}

	@GET
	@Path("/location")
	@Produces({ MediaType.APPLICATION_JSON })
	@SuppressWarnings("static-access")
	public Response getExistentLocations(){
				
		return Response.ok(eventService.getAllLocations()).header("Access-Control-Allow-Origin", "*")
				 					    .build();
	}
}
