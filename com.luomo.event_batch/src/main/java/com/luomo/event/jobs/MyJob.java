//package com.luomo.event.jobs;
//
//
//import org.quartz.JobExecutionContext;
//import org.quartz.StatefulJob;
//import org.springframework.batch.core.JobExecutionException;
//import org.springframework.scheduling.quartz.QuartzJobBean;
//
//import com.luomo.event.MyBean;
//
//public class MyJob extends QuartzJobBean implements StatefulJob{
//
//	private MyBean myBean;
//
//	  public MyJob() {
//	    System.out.println("MyJob.MyJob()");
//	  }
//
//	  @Override
//	  protected void executeInternal(final JobExecutionContext context) {
//	    System.out.println("myBean's name=[" + myBean.getName() + "] and its instance is [" + myBean + "].");
//	  }
//
//	  public void setMyBean(final MyBean myBean) {
//	    this.myBean = myBean;
//	  }
//}
