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
		Location locationBraga = new Location(1l, "braga", "pt", "Avenida Liberdade", "4700", 12f, -34.5f);
		Location locationPorto = new Location(2l, "Porto", "pt", "Avenida Liberdade", "4000", 12f, -34.5f);
		Location locationCoimbra = new Location(3l, "Coimbra", "co", "Avenida xpto", "2000", 12f, -34.5f);

		Venue venueBraga = new Venue(1l, "Teatro Circo",locationBraga,	"www.teatro-circo.com", "253272000", "imageLocation");
		Venue venuePorto = new Venue(2l,  "Trintaeum ", locationPorto, "www.trintaeum.com", "222272000", "imageLocation");
		Venue venueCoimbra = new Venue(2l, "Coimbra place", locationCoimbra, "www.xpto.com", "222272000", "imageLocation");
		
		Artist artist = new Artist(1L, "artist");
		Provider provider = new Provider(1l, "lastFm", "www.lastfm.com", new Date().toString());
		
		eventList = new ArrayList<Event>();
		eventList.add(new Event(1l, "Event 1", "12-12-2012", "Music event", "image tag", "12", "tag", "url", "website", artist, venueBraga, provider));
		eventList.add(new Event(2l, "Event 2", "01-12-2012", "Other Music event", "image tag", "12", "tag", "url", "website", artist, venuePorto, provider));
		eventList.add(new Event(3l, "Event 3", "01-12-2012", "AnOther Music event", "image tag", "12", "tag", "url", "website", artist, venueCoimbra, provider));
		eventList.add(new Event(4l, "Event 4", "01-12-2012", "AnOther Music event", "image tag", "12", "tag", "url", "website", artist, venueBraga, provider));
		eventList.add(new Event(5l, "Event 5", "11-12-2012", "Music event", "image tag", "12", "tag", "url", "website", artist, venueBraga, provider));
		
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

	public static List<Event> getEventsByLocation(Long id) {
		
		return findByLocationId(id);
	}

	private static List<Event> findByLocationId(Long id) {
		List<Event> res = new ArrayList<Event>();
		for (Event event : eventList) {
			if(event.getVenue().getLocation().getId().equals(id))
				res.add(event);
		}
		return res;
	}

	public static Collection<EventsByCityDto> getEventsByLocationSimple() {
		Map<Long, EventsByCityDto> map = new HashMap<Long, EventsByCityDto>();
		Location location = null;
		Long locId = null;
		for (Event event : eventList) {
			location = event.getVenue().getLocation();
			locId = location.getId();
			EventsByCityDto eventsByCityDto = map.get(locId);
			if(eventsByCityDto == null) {
				eventsByCityDto = new EventsByCityDto(locId, location.getCity(),1L);
				map.put(locId, eventsByCityDto);
			}
			else
				eventsByCityDto.addEvents();
		}
		return map.values();
	}
	
}
