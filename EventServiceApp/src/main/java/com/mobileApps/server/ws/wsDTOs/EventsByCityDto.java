package com.mobileApps.server.ws.wsDTOs;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "eventByCity")
public class EventsByCityDto {

	private String city;
	private Long nbrEvents;
	
	
	public EventsByCityDto(){}
	
	
	public EventsByCityDto(String city, Long nbrEvents) {
		super();
		this.city = city;
		this.nbrEvents = nbrEvents;
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
	
	public void addEvents(){
		nbrEvents += 1;
	}
	
	
}
