package com.mobileApps.server.ws.resources;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.mobileApps.server.ws.service.EventService;

@Path("/venue")
public class VenueResource {


	private EventService eventService;
	

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
