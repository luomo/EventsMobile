package com.mobileApps.server.ws.wsDTOs;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import com.mobileApps.server.ws.domain.Event;

@XmlRootElement(name = "eventByCity")
public class EventsByCityDto {
	
	public static Comparator<EventsByCityDto> byCityASC = new Comparator<EventsByCityDto>() {

		@Override
		public int compare(EventsByCityDto o1, EventsByCityDto o2) {
			return o1.getCity().compareTo(o2.getCity());
		}
	};
		

		
	

	private String city;
	private Long nbrEvents = 0l;
	private List<Event> eventList = new ArrayList<Event>();
	
	
	public EventsByCityDto(){}
	
	
	public EventsByCityDto(String city) {
		super();
		this.city = city;
	}
	
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public Long getNbrEvents() {
		return nbrEvents;
	}
	public void setNbrEvents(Long nbrEvents) {
		this.nbrEvents = nbrEvents;
	}
	
	
	public List<Event> getEventList() {
		return eventList;
	}


	public void setEventList(List<Event> eventList) {
		this.eventList = eventList;
	}


	public void addEvent(Event event){
		eventList.add(event);
		nbrEvents += 1;
	}


	public void orderEventsBySortCondition(String sortBy, String sortMode) {
		if(sortBy.equalsIgnoreCase("ByTitle"))
			if(sortMode.equalsIgnoreCase("ASC"))				
				Collections.sort(eventList,Event.Order.ByTitle.ascending());
			else
				Collections.sort(eventList,Event.Order.ByTitle.descending());
		if(sortBy.equalsIgnoreCase("ByCity"))
			if(sortMode.equalsIgnoreCase("ASC"))				
				Collections.sort(eventList,Event.Order.ByCity.ascending());
			else
				Collections.sort(eventList,Event.Order.ByCity.descending());
		if(sortBy.equalsIgnoreCase("ByCity"))
			if(sortMode.equalsIgnoreCase("ASC"))				
				Collections.sort(eventList,Event.Order.ByStartDate.ascending());
			else
				Collections.sort(eventList,Event.Order.ByStartDate.descending());
		
	}
	
	
}
