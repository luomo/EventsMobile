package com.mobileApps.server.ws.wsDTOs;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import com.mobileApps.server.ws.domain.Event;
import com.mobileApps.server.ws.domain.Venue;

@XmlRootElement(name = "eventByCity")
public class VenueByCityDto {
	
	public static Comparator<VenueByCityDto> byCityASC = new Comparator<VenueByCityDto>() {

		@Override
		public int compare(VenueByCityDto o1, VenueByCityDto o2) {
			return o1.getCity().compareTo(o2.getCity());
		}
	};
		

		
	

	private String city;
	private Long nbrVenues = 0l;
	private List<Venue> venueList = new ArrayList<Venue>();
	
	
	public VenueByCityDto(){}
	
	
	public VenueByCityDto(String city) {
		super();
		this.city = city;
	}
	


	public String getCity() {
		return city;
	}


	public void setCity(String city) {
		this.city = city;
	}


	public Long getNbrVenues() {
		return nbrVenues;
	}


	public void setNbrVenues(Long nbrVenues) {
		this.nbrVenues = nbrVenues;
	}



	public List<Venue> getVenueList() {
		return venueList;
	}


	public void setVenueList(List<Venue> venueList) {
		this.venueList = venueList;
	}

	public void addVenue(Venue venue) {
		venueList.add(venue);
		nbrVenues += 1;
	}
	
	public void orderVenueBySortCondition(String sortBy, String sortMode) {
		if(sortBy.equalsIgnoreCase("ByName")) {
			if(sortMode.equalsIgnoreCase("ASC"))				
				Collections.sort(venueList,Venue.Order.ByName.ascending());
			else
				Collections.sort(venueList,Venue.Order.ByName.descending());
		}
		
	}
	
}
