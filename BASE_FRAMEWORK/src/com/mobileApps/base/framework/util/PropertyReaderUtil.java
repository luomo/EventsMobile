package com.mobileApps.base.framework.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

public class PropertyReaderUtil {
	
	private static Logger log = Logger.getLogger(PropertyReaderUtil.class);
	
	public void setLog(Logger logger) {
		log = logger;
	}

	public static Logger getLog() {
		return log;
	}

	public static String readPropertyFromResourceBundle(ClassLoader loader, String resource, String key){
		InputStream in = loader.getResourceAsStream(resource);
		getLog().debug(" > Config. File: " + in);
		Properties result = new Properties();
		String value = null;
		try {
			result.load(in);
			value = result.get(key).toString();
			getLog().debug(" > " + value);
		} catch (IOException e) {
			getLog().error(e);
		}
		return value;
	}
	
}
