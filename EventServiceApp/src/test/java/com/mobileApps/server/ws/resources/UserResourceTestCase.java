package com.mobileApps.server.ws.resources;

import java.net.URI;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriBuilder;

import junit.framework.Assert;

import org.junit.Test;

import com.mobileApps.server.ws.domain.UserInfo;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.api.client.config.DefaultClientConfig;


public class UserResourceTestCase {//extends JerseyTest {


	private static URI getBaseURI() {
		return UriBuilder.fromUri(
				"http://localhost:8080/EventServiceApp/resources/users").build();
	}
	

	@Test
	public void sendExample() {
		ClientConfig config = new DefaultClientConfig();
		Client client = Client.create(config);
		
		UserInfo userInfo = new UserInfo("aasd", "asd");
		
	    WebResource webResource = client.resource(getBaseURI());
	    UserInfo resp = webResource.type(MediaType.APPLICATION_JSON).post(UserInfo.class, userInfo);


	    
	    Assert.assertEquals(resp.getUsername(), userInfo.getUsername());
	    Assert.assertEquals(resp.getPassword(), userInfo.getPassword());

				
//	    ClientResponse clientResponse = webResource.path(beginPath + methodPath + "/" + uniqueField).get(
//                ClientResponse.class);
//	    JSONObject jsonObject = clientResponse.getEntity(JSONObject.class);
//
//	    if (200 == clientResponse.getStatus() && !jsonObject.isNull(uniqueFieldName)) {
//	        check = true;
    
	}
}
