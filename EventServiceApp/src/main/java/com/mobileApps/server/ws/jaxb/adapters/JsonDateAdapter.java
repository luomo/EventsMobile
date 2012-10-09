package com.mobileApps.server.ws.jaxb.adapters;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import javax.xml.bind.DatatypeConverter;
import javax.xml.bind.annotation.adapters.XmlAdapter;

public class JsonDateAdapter extends XmlAdapter<String, Date> {

    @Override
    public Date unmarshal(String s) throws Exception {
    	return DatatypeConverter.parseDate(s).getTime();
    }

    @Override
    public String marshal(Date v) throws Exception {
    	Calendar cal = new GregorianCalendar();
		cal.setTime(v);
		return DatatypeConverter.printDateTime(cal);
    }

}
