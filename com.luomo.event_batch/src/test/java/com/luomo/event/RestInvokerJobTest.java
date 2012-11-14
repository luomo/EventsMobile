package com.luomo.event;
import java.util.Date;

import org.junit.Test;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.test.context.ContextConfiguration;

 

@ContextConfiguration
public class RestInvokerJobTest 
	extends AbstractJobStructureTest {
	
	@Test 
	public void jobTest() throws Exception {
		
		JobExecution run = jobLauncher.run(
				job, 
				new JobParametersBuilder()
										  .addDate("date", new Date())
										  .toJobParameters());

		System.out.println(run);
	}

}
