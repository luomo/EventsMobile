package com.mobileApps.server.ws.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.mobileApps.server.ws.domain.Artist;
import com.mobileApps.server.ws.domain.Event;
import com.mobileApps.server.ws.domain.Location;
import com.mobileApps.server.ws.domain.Provider;
import com.mobileApps.server.ws.domain.Venue;
import com.mobileApps.server.ws.wsDTOs.EventsByCityDto;

public class EventService {

	private static final List<Event> eventList;
	private static final List<Location> locationList;
	 
	
	static {
		Location locationBraga = new Location("braga", "pt", "Avenida Liberdade", "4700", 12f, -34.5f);
		Location locationPorto = new Location("Porto", "pt", "Avenida Liberdade", "4000", 12f, -34.5f);
		Location locationCoimbra = new Location("Coimbra", "co", "Avenida xpto", "2000", 12f, -34.5f);

		Venue venueBraga = new Venue(1l, "Teatro Circo",locationBraga,	"www.teatro-circo.com", "253272000", null);
		Venue venuePorto = new Venue(2l,  "Trintaeum ", locationPorto, "www.trintaeum.com", "222272000", null);
		Venue venueCoimbra = new Venue(2l, "Coimbra place", locationCoimbra, "www.xpto.com", "222272000", null);
		
		Artist artist = new Artist(1L, "artist");
		Provider provider = new Provider(1l, "lastFm", "www.lastfm.com", new Date().toString());
		
		eventList = new ArrayList<Event>();
		eventList.add(new Event(1l, "Event 1", new Date(), "Music event", null, "12", 12F,"tag", 1L, new Date(), "url", artist, venueBraga));
		eventList.add(new Event(2l, "Event 2", new Date(), "Other Music event",  null, "12", 10F, "tag", 1L, new Date(),"url", artist, venuePorto));
		eventList.add(new Event(3l, "Event 3", new Date(), "AnOther Music event", null,"12",10F, "tag", 1L, new Date(),"url", artist, venueCoimbra));
		eventList.add(new Event(4l, "Event 4", new Date(), "AnOther Music event", null, "12", 10F, "tag", 1L, new Date(),"url", artist, venueBraga));
		eventList.add(new Event(5l, "Event 5", new Date(), "Music event", null, "12", 10F, "tag",1L, new Date(), "url", artist, venueBraga));
		
		locationList = new ArrayList<Location>();
		locationList.add(locationBraga);
		locationList.add(locationPorto);
		locationList.add(locationCoimbra);
	}
	
	public static List<Event> getAllEvents(){
		return eventList;
	}
	
	public static List<Location> getAllLocations() {
		return locationList;
	}

	public static List<Event> getEventsByLocation(String id) {
		
		return findByLocationId(id);
	}

	private static List<Event> findByLocationId(String city) {
		List<Event> res = new ArrayList<Event>();
		for (Event event : eventList) {
			if(event.getVenue().getLocation().getCity().equalsIgnoreCase(city))
				res.add(event);
		}
		return res;
	}
	
	public static Event getEventsById(Long id) {
		for (Event event : eventList) {
			if(event.getId().equals(id))
				return event;
		}
		return null;
	}

	public static Collection<EventsByCityDto> getEventsByLocationSimple() {
		Map<String, EventsByCityDto> map = new HashMap<String, EventsByCityDto>();
		Location location = null;
		String city = null;
		for (Event event : eventList) {
			location = event.getVenue().getLocation();
			city = location.getCity();
			EventsByCityDto eventsByCityDto = map.get(city);
			if(eventsByCityDto == null) {
				eventsByCityDto = new EventsByCityDto(location.getCity(),1L);
				map.put(city, eventsByCityDto);
			}
			else
				eventsByCityDto.addEvents();
		}
		return map.values();
	}

	
	
}
