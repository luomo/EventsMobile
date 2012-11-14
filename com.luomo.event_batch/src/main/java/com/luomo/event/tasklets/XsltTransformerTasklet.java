package com.luomo.event.tasklets;

import java.io.File;
import java.util.Date;
import java.util.Map;

import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.util.Assert;

public class XsltTransformerTasklet 
	implements Tasklet{

	
	
	public RepeatStatus execute(StepContribution step, ChunkContext chunk)
			throws Exception {
		Map<String, Object> params =
				chunk.getStepContext().getJobParameters();
		String path = (String) params.get("path");
		String ageParam = (String) params.get("age");

			
		String xmlInputFile =          "C:/development/other_developments/Events_App/lfm_xstl/events_batch.xml";
		String xmlOutputFile =         "C:/development/other_developments/Events_App/lfm_xstl/events_after_process.xml";
		String sxlTransformationFile = "C:/development/other_developments/Events_App/lfm_xstl/lfm_xstl.xsl";
		
		try {
			
			TransformerFactory tf = TransformerFactory.newInstance();
			Transformer t = tf.newTransformer(
					new StreamSource(sxlTransformationFile));
			t.transform(
					new StreamSource(xmlInputFile) , 
					new StreamResult(new File(xmlOutputFile)));
			
		} catch (TransformerConfigurationException e) {
			
			e.printStackTrace();
			
		} catch (TransformerException e) {
			
			e.printStackTrace();
		}
		
		return RepeatStatus.FINISHED;
	}
	
	
	public static void main(String[] args) {
		
		String xmlInputFile =          "C:/development/other_developments/Events_App/lfm_xstl/lfm_xml.xml";
		String xmlOutputFile =         "C:/development/other_developments/Events_App/lfm_xstl/events.xml";
		String sxlTransformationFile = "C:/development/other_developments/Events_App/lfm_xstl/lfm_xstl.xsl";
		
		try {
			
			TransformerFactory tf = TransformerFactory.newInstance();
			Transformer t = tf.newTransformer(
					new StreamSource(sxlTransformationFile));
			t.transform(
					new StreamSource(xmlInputFile) , 
					new StreamResult(new File(xmlOutputFile)));
			
		} catch (TransformerConfigurationException e) {
			
			e.printStackTrace();
			
		} catch (TransformerException e) {
			
			e.printStackTrace();
		}
	}
}
