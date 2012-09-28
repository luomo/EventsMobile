/**
 *
 */
package com.mobileApps.server.ws.domain;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import com.mobileApps.server.ws.jaxb.adapters.JsonDateAdapter;

/**
 * @author templth
 * <artist>Brit Floyd</artist>
   <local/>
   <localAddress>Campo Pequeno
1000-082 Lisboa</localAddress>
   <date/>
   <price>20 € a 35 €</price>
   <localSite>http://www.campopequeno.com</localSite>
 */


@XmlRootElement(name = "event")
public class Event implements Serializable {


	public static enum Order implements Comparator<Event>{
		ByTitle {
			@Override
			public int compare(Event ev_1, Event ev_2) {				
				return ev_1.getTitle().compareTo(ev_2.getTitle());
			}
		} ,
		ByCity {
			@Override
			public int compare(Event ev_1, Event ev_2) {
				String city_ev_1 = ev_1.getVenue().getLocation().getCity();
				String city_ev_2 = ev_2.getVenue().getLocation().getCity();
				return city_ev_1.compareTo(city_ev_2);
			}
		} ,
		ByStartDate {
			@Override
			public int compare(Event ev_1, Event ev_2) {
				Date city_ev_1 = ev_1.getStartDate();
				Date city_ev_2 = ev_2.getStartDate();
				return city_ev_1.compareTo(city_ev_2);
			}
		} ;
		
		public abstract int compare(Event lhs, Event rhs);

		public Comparator<Event> ascending() {
			return this;
		}

		public Comparator<Event> descending() {
			return Collections.reverseOrder(this);
		}


	}
	
	private Long id;

	private String title;
	private Date startDate;
	private String description;
	private byte[] image;
	private String attendance;
	private Float price;
	private String tag;
	
	//control fields
	private Long owner;
	private Date processDate;
	private String url;
	

	private Artist artist;
	private Venue venue;

	

	public Event() {
	}
	

	
	public Event(Long id, String title, Date startDate, String description,
			byte[] image, String attendance, Float price, String tag,
			Long owner, Date processDate, String url, Artist artist, Venue venue) {
		super();
		this.id = id;
		this.title = title;
		this.startDate = startDate;
		this.description = description;
		this.image = image;
		this.attendance = attendance;
		this.price = price;
		this.tag = tag;
		this.owner = owner;
		this.processDate = processDate;
		this.url = url;
		this.artist = artist;
		this.venue = venue;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}



	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}

	@XmlJavaTypeAdapter(JsonDateAdapter.class)
	public Date getStartDate() {
		return startDate;
	}


	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public String getAttendance() {
		return attendance;
	}

	public void setAttendance(String attendance) {
		this.attendance = attendance;
	}

	public Float getPrice() {
		return price;
	}

	public void setPrice(Float price) {
		this.price = price;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public Long getOwner() {
		return owner;
	}

	public void setOwner(Long owner) {
		this.owner = owner;
	}

	@XmlJavaTypeAdapter(JsonDateAdapter.class)
	public Date getProcessDate() {
		return processDate;
	}

	public void setProcessDate(Date processDate) {
		this.processDate = processDate;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Artist getArtist() {
		return artist;
	}

	public void setArtist(Artist artist) {
		this.artist = artist;
	}

	public Venue getVenue() {
		return venue;
	}


	public void setVenue(Venue venue) {
		this.venue = venue;
	}


	@Override
	public String toString() {
		return "Event [id=" + id + ", title=" + title + ", startDate="
				+ startDate + ", description=" + description + ", image="
				+ Arrays.toString(image) + ", attendance=" + attendance
				+ ", price=" + price + ", tag=" + tag + ", owner=" + owner
				+ ", processDate=" + processDate + ", url=" + url + ", artist="
				+ artist + ", venue=" + venue + "]";
	}





	//	@PrePersist
//	public void test(){
//		System.out.println("***********************");
//		//SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MMM-dd hh:mm:ss"); 
//		//this.setProcessDate(sdf.format(new Date()));
//		this.setProcessDate(new Date());
//
//	}



}

