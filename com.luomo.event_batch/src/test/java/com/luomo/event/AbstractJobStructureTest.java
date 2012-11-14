/**
 * 
 */
package com.luomo.event;

import org.junit.runner.RunWith;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * @author jcunha
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
public abstract class AbstractJobStructureTest {

	@Autowired
	protected ApplicationContext applicationContext;
	
	@Autowired
	protected Job job;
	
	@Autowired
	protected JobLauncher jobLauncher;

}
