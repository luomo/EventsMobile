/**
 * 
 */
package com.luomo.event.writer;

import java.util.ArrayList;
import java.util.List;

import org.springframework.batch.core.StepExecution;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.item.ItemWriter;

import com.luomo.event.domain.Event;

/**
 * @author jcunha
 *
 */
public class DummyEventItemWriter implements ItemWriter<Event> {
	
	public List<Event> events = new ArrayList<Event>();
	   private StepExecution stepExecution;
	
	public void write(List<? extends Event> items) throws Exception {
		
		 ExecutionContext stepContext = this.stepExecution.getExecutionContext();
	        stepContext.put("someKey", "");
		
		//System.out.println("items = "+items.size());
		events.addAll(items);
		System.out.println("> " + events);
	}

	public List<Event> getEvents() {
		return events;
	}

}
