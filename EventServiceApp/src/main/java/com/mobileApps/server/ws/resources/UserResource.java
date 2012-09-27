package com.mobileApps.server.ws.resources;

import java.net.URI;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import com.mobileApps.server.ws.domain.UserInfo;
import com.mobileApps.server.ws.service.UserService;

@Path("/users")
public class UserResource {


	private UserService userService;
	
	@POST
	@Consumes({MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public Response  registerUser(@Context UriInfo ui, @Context HttpHeaders hh, UserInfo user){
		
		boolean registerUser = true;//UserService.registerUser(user);
		
		if(!registerUser)
			throw new WebApplicationException(
			        Response
			          .status(Status.PRECONDITION_FAILED)
			          .entity("User already existent")
			          .build()
			      );
//		return new JSONWithPadding(
//		        new GenericEntity(entity, genericType)<User>(competitions) {
//		        }, callback);
		return Response.created(URI.create("/users/" + user.getUsername())).entity(user).header("Access-Control-Allow-Origin", "*").build();
	}
	
	
		
}
