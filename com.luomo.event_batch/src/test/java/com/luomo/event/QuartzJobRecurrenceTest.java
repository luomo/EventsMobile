package com.luomo.event;

import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;



//@ContextConfiguration("classpath:/com/luomo/event/quartzJobTest-context.xml")
public class QuartzJobRecurrenceTest {
	

	@Test
	public void dummyTest(){
		
	}
	
	public static void main(String[] args) {
		new ClassPathXmlApplicationContext("/com/luomo/event/quartzJobTest-context.xml");
	}
	
}
