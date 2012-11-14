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
public class DeleteFilesTest 
	extends AbstractJobStructureTest {

	@Value("${batch.temp.dir}")
	private String path;

	@Value("${batch.temp.age}")
	private String age;

	
	
	@Test 
	public void jobTest() throws Exception {
		
		JobExecution run = jobLauncher.run(
				job, 
				new JobParametersBuilder().addString("path", path)
										  .addString("age", age)
										  .addDate("date", new Date())
										  .toJobParameters());

		System.out.println(run);
	}
	
	
}
