package com.mobileApps.server.ws.resources;

import java.net.URI;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mobileApps.server.domain.Event;
import com.mobileApps.server.domain.User;
import com.mobileApps.server.services.IEventService;
import com.mobileApps.server.services.IUserService;
import com.mobileApps.server.ws.service.UserService;

@Component
@Path("/users")
public class UserDbResource {


	@Autowired
	private IUserService userService;

	@Autowired
	private IEventService eventService;
	
	@POST
	@Consumes({MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public Response registerUser(@Context UriInfo ui, 
		    					 @Context HttpServletResponse response,  
								 User user){
		
		user = userService.save(user);
		boolean registerUser = (user.getId() != null) ? true : false;//UserService.registerUser(user);
		
		if(!registerUser)
			throw new WebApplicationException(
			        Response
			          .status(Status.PRECONDITION_FAILED)
			          .entity("User already existent")
			          .build()
			      );
//		return new JSONWithPadding(
//		        new GenericEntity<User>(user, User.class) {
//		        }, callback);
//		response.setHeader("Access-Control-Allow-Origin", "*");
//		return Response.seeOther(url_you_want_to_redirect_to).build();.
		return Response.created(URI.create("/users/" + user.getUsername())).entity(user).header("Access-Control-Allow-Origin", "*").build();
	}
	

	@PUT
	@Path("/favourites/add/{userId}")
	@Consumes({MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public Response addEventToUserFavourites(
			@Context UriInfo ui, 
			@Context HttpServletResponse response,
			@PathParam("userId") Long userId,
			Event event){

		User user = userService.addEventToUserFavourites(userId, event);
		return Response.ok().entity(user).header("Access-Control-Allow-Origin", "*").build();
	}

	@PUT
	@Path("/favourites/remove/{userId}")
	@Consumes({MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public Response removeEventFromUserFavourites(
			@Context UriInfo ui, 
			@Context HttpServletResponse response,
			@PathParam("userId") Long userId,
			Event event){
		
		User user = userService.removeEventFromUserFavourites(userId, event);
		return Response.ok().entity(user).header("Access-Control-Allow-Origin", "*").build();
	}
	
	

	@PUT
	@Path("/favourites/event/{eventId}")
	public void addEventToUserFavourites(
			@PathParam("eventId") Long eventId){
		Event event = eventService.findById(eventId);
		// to be refactored and pass this code to userinfo service
		User user = userService.findById(1l);
		user.getFavourtites().add(event);
		userService.saveOrUpdate(user);
		
	}
	
	@GET
	@Path("/test/favourites/{userId}")
	@Consumes({MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public List<Event> getUserFavourites(
			@PathParam("userId") Long userId){
		User user = userService.findById(userId);
		return user.getFavourtites();
	}
		
}
