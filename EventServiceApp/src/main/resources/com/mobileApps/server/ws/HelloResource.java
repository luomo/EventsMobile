package com.mobileApps.server.ws;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


@Path("/hello")
public class HelloResource {

	
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String sayHello(){
		return "Hello world by Jersey";
	}
}
