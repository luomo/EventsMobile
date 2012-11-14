package com.luomo.event.tasklets;

import java.io.File;
import java.io.FileWriter;
import java.util.Date;
import java.util.Map;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;

public class WriteTimestampFileTasklet 
	implements Tasklet{

	
	public RepeatStatus execute(StepContribution step, ChunkContext chunk)
			throws Exception {
		Map<String, Object> params =
				chunk.getStepContext().getJobParameters();
	
		String path = (String) params.get("path");
		String fileName = (String) params.get("file");
		
		File file = new File(path, fileName);
	    FileWriter fw = new FileWriter(file, true);
	    fw.write(new Date().toString());
	    fw.write(System.getProperty("line.separator"));
	    fw.flush();
	    fw.close();
	    
		return RepeatStatus.FINISHED;
	}
}
