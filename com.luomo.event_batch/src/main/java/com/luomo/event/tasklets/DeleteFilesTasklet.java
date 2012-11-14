package com.luomo.event.tasklets;

import java.io.File;
import java.util.Date;
import java.util.Map;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.util.Assert;

public class DeleteFilesTasklet 
	implements Tasklet{

	
	public RepeatStatus execute(StepContribution step, ChunkContext chunk)
			throws Exception {
		Map<String, Object> params =
				chunk.getStepContext().getJobParameters();
		String path = (String) params.get("path");
		String ageParam = (String) params.get("age");

		Assert.notNull(path);
		Assert.notNull(ageParam);
		
		Long age = Long.valueOf(ageParam);
		
		
		File tempDirectory = new File(path);
		File[] files = tempDirectory.listFiles();
		Date now = new Date();
		long oldesttime = now.getTime() - age;
		if(files != null)
			for (File file : files) {
				if (file.lastModified() < oldesttime) {
					file.delete();
				}
	
			}
		return RepeatStatus.FINISHED;
	}
}
