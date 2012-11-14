/**
 * 
 */
package com.luomo.event.writer;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.batch.core.StepExecution;
import org.springframework.batch.item.ItemWriter;

/**
 * @author jcunha
 *
 */
public class FileItemWriter implements ItemWriter<Object> {


	private StepExecution stepExecution;

	public void write(List<? extends Object> items) throws Exception {

		//			 ExecutionContext stepContext = this.stepExecution.getExecutionContext();
		//		        stepContext.put("someKey", "");

		File file;
		String fileName;
		String location = "C:/development/other_developments/Events_App/lfm_xstl/";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMMdd_hhmmss"); 


		for (Object object : items) {
//			fileName = sdf.format(new Date()) + "_events_batch.xml";
			fileName = location + "events_batch.xml";
			file = new File(fileName);
			boolean exist = file.createNewFile();

//			if (!exist) {
//				System.out.println("File already exists.");
//				System.exit(0);
//			}

			FileWriter fstream = new FileWriter(fileName);
			BufferedWriter out = new BufferedWriter(fstream);
			out.write((String)object);
			out.close();

		}

		System.out.println();
	}



}
