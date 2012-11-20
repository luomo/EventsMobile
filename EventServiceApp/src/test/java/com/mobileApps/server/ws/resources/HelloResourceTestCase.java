package com.mobileApps.server.ws.resources;

import java.net.URI;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriBuilder;
import javax.xml.bind.JAXBException;

import org.junit.Test;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.api.client.config.DefaultClientConfig;


public class HelloResourceTestCase {//extends JerseyTest {

	public HelloResourceTestCase() throws Exception {
//	      super(new WebAppDescriptor.Builder("com.sun.jersey.samples.springannotations.resources.jerseymanaged")
//	                .contextPath("spring")
//	                .contextParam("contextConfigLocation", "classpath:applicationContext.xml")
//	                .servletClass(SpringServlet.class)
//	                .contextListenerClass(ContextLoaderListener.class)
//	                .build());
//		super("com.mobileApps.server.ws.resources.HelloResource");
	    }

	private static URI getBaseURI() {
		return UriBuilder.fromUri(
				"http://localhost:8080/EventServiceApp/resources/").build();
	}
	
	//@Test
	public void testHelloWorld() throws JAXBException {
		ClientConfig config = new DefaultClientConfig();
		Client client = Client.create(config);
		WebResource service = client.resource(getBaseURI());
		System.out.println(service.path("hello").accept(
				MediaType.TEXT_HTML).get(String.class));
//		WebResource webResource = resource();
//        String responseMsg = webResource.path("hello").get(String.class);
//        Assert.assertEquals("Hello world by Jersey", responseMsg);
	}
}
