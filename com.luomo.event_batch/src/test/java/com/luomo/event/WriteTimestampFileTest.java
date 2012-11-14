/**
 * 
 */
package com.luomo.event;

import java.util.Date;

import org.junit.Test;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.context.ContextConfiguration;


@ContextConfiguration
public class WriteTimestampFileTest 
	extends AbstractJobStructureTest {

	@Value("${batch.job.writeFile.outputFolder}")
	private String path;

	@Value("${batch.job.writeFile.outputFile}")
	private String file;

	
	
	@Test 
	public void jobTest() throws Exception {
		
		JobExecution run = jobLauncher.run(
				job, 
				new JobParametersBuilder().addString("path", path)
										  .addString("file", file)
										  .addDate("date", new Date())
										  .toJobParameters());

		System.out.println(run);
	}
	
	
}
