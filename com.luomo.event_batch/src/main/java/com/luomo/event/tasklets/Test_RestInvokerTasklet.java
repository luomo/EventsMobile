package com.luomo.event.tasklets;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class Test_RestInvokerTasklet implements Tasklet{

	public RepeatStatus execute(StepContribution arg0, ChunkContext arg1)
			throws Exception {
		
		RestTemplate restTemplate = new RestTemplate();
//		String uri = "http://ws.audioscrobbler.com/2.0/?method=event.getinfo&event=328799&api_key=cfbfebdd3ef5381d2ae26a7f4eb312aa";
		String uri = "http://ws.audioscrobbler.com/2.0/?method=geo.getevents&location=portugal&limit=100&api_key=cfbfebdd3ef5381d2ae26a7f4eb312aa";
		
		
		ResponseEntity<String> o = restTemplate.getForEntity(uri, String.class);
		String body = o.getBody();
		System.out.println(body);
		
		return RepeatStatus.FINISHED;
	}
	
	public static void main(String[] args) {
		RestTemplate restTemplate = new RestTemplate();
		String uri = "http://ws.audioscrobbler.com/2.0/?method=event.getinfo&event=328799&api_key=cfbfebdd3ef5381d2ae26a7f4eb312aa";
//		String uri = "http://ws.audioscrobbler.com/2.0/?method=geo.getevents&location=portugal&limit=100&api_key=cfbfebdd3ef5381d2ae26a7f4eb312aa";
		
		
		ResponseEntity<String> o = restTemplate.getForEntity(uri, String.class);
		String body = o.getBody();
		System.out.println(body);
	}
}
