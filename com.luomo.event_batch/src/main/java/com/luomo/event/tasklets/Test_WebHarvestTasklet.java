package com.luomo.event.tasklets;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.webharvest.definition.ScraperConfiguration;
import org.webharvest.runtime.Scraper;

public class Test_WebHarvestTasklet 
	implements Tasklet{


	private String webHarvestLocation; 
	private String webHarvestOutput; 
	private String processName; 
		
	
	
	public Test_WebHarvestTasklet(
			String webHarvestLocation,
			String webHarvestOutput, 
			String processName) {
		super();
		this.webHarvestLocation = webHarvestLocation;
		this.webHarvestOutput = webHarvestOutput;
		this.processName = processName;
	}



	public RepeatStatus execute(StepContribution arg0, ChunkContext arg1)
			throws Exception {
		
		ScraperConfiguration config = new ScraperConfiguration(webHarvestLocation+"/"+processName);
		Scraper scraper = new Scraper(config, webHarvestOutput);
		
//		scraper.setDebug(true);
//		scraper.getHttpClientManager().setHttpProxy("proxy.wh", 3128);
//		scraper.getHttpClientManager().setHttpProxyCredentials(myUsername, myPassword, myNTHost, myNTDomain);
		
		scraper.execute();
		
		System.out.println("");
		
		return RepeatStatus.FINISHED;
	}
}
