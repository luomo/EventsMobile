package com.mobileApps.server.ws.resources;

import java.net.URI;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import com.mobileApps.server.domain.Venue;
import com.mobileApps.server.ws.service.EventService;

@Path("/venue")
public class VenueResource {


	private EventService eventService;
	

	@POST
	@Consumes({MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public Response registerVenue(@Context UriInfo ui, 
		    					 @Context HttpServletResponse response,  
								 Venue venue){
		
		venue = EventService.registerVenue(venue);
		
		if(venue.getId() == null)
			throw new WebApplicationException(
			        Response
			          .status(Status.PRECONDITION_FAILED)
			          .entity("Event alreay exists .. testing!!!")
			          .build()
			      );

		return Response.created(URI.create("/" + venue.getId())).entity(venue).header("Access-Control-Allow-Origin", "*").build();
	}
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@SuppressWarnings("static-access")
	public Response getExistentLocationsByCountry(){
				
		return Response.ok(EventService.getAllVenues()).header("Access-Control-Allow-Origin", "*")
				 					    .build();
	}
	
	@GET
	@Path("/country/{country}")
	@Produces({ MediaType.APPLICATION_JSON })
	@SuppressWarnings("static-access")
	public Response getExistentLocationsByCountry( @PathParam("country") String country,
			@DefaultValue("ByName") @QueryParam("sortBy") String sortBy,
			@DefaultValue("ASC") @QueryParam("sortMode") String sortMode){
		
		return Response.ok(EventService.getVenuesByCountry(country, sortBy, sortMode)).header("Access-Control-Allow-Origin", "*")
				.build();
	}

	@GET
	@Path("/{venueId}")
	@Produces({ MediaType.APPLICATION_JSON })
	@SuppressWarnings("static-access")
	public Response getExistentLocations( @PathParam("venueId") Long venueId){
		
		return Response.ok(EventService.getVenueById(venueId)).header("Access-Control-Allow-Origin", "*")
				.build();
	}
	


	
}
