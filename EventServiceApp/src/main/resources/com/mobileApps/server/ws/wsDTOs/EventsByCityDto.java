package com.mobileApps.server.ws.wsDTOs;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "eventByCity")
public class EventsByCityDto {

	private Long cityId;
	private String city;
	private Long nbrEvents;
	
	
	public EventsByCityDto(){}
	
	
	public EventsByCityDto(Long cityId, String city, Long nbrEvents) {
		super();
		this.cityId = cityId;
		this.city = city;
		this.nbrEvents = nbrEvents;
	}
	public Long getCityId() {
		return cityId;
	}
	public void setCityId(Long cityId) {
		this.cityId = cityId;
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
