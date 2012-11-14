package com.luomo.event.itemProcessor;

import org.springframework.batch.item.ItemProcessor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.luomo.event.domain.Feed;

public class FeedInvokerProcessor 
	implements ItemProcessor<Object, Object>{

	
	
	@Override
	public Object process(Object item) throws Exception {
		RestTemplate restTemplate = new RestTemplate();
//		String uri = "http://ws.audioscrobbler.com/2.0/?method=event.getinfo&event=328799&api_key=cfbfebdd3ef5381d2ae26a7f4eb312aa";
//		String uri = "http://ws.audioscrobbler.com/2.0/?method=geo.getevents&location=portugal&limit=10&api_key=cfbfebdd3ef5381d2ae26a7f4eb312aa";
		
		String uri = ((Feed) item).getUrl();
		System.out.println("URI > " + uri);
		
		ResponseEntity<String> o = restTemplate.getForEntity(uri, String.class);
		String body = o.getBody();
//		String body = "";
//		System.out.println(body);
		
		return body;
	}

}
