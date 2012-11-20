/**
 *
 */
package com.mobileApps.server.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
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


@Entity
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
	// status will have 3 possible values ... 
	// 1  - when created
	// 0  - when deleted  
	private Integer status = 1;
	private Long owner;
	private Date processDate;
	private String url;
	// 1 - when created in client side and still to be inserted/sync to server side. After sync should be updated to 0
	// 0 - when no sync needed
	private Integer syncStatus;
	
	
	

	private Artist artist;
	private Venue venue;

	

	public Event() {
	}
	

	
	public Event(Long id, String title, Date startDate, String description,
			byte[] image, String attendance, Float price, String tag, Integer status,
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
		this.status = status;
		this.owner = owner;
		this.processDate = processDate;
		this.url = url;
		this.artist = artist;
		this.venue = venue;
	}

	public Event(Long id, String title, Date startDate, String description,
			byte[] image, String attendance, Float price, String tag, Integer status,
			Long owner, Date processDate, String url, Artist artist, Venue venue, Integer syncStatus) {
		super();
		this.id = id;
		this.title = title;
		this.startDate = startDate;
		this.description = description;
		this.image = image;
		this.attendance = attendance;
		this.price = price;
		this.tag = tag;
		this.status = status;
		this.owner = owner;
		this.processDate = processDate;
		this.url = url;
		this.artist = artist;
		this.venue = venue;
		this.syncStatus = syncStatus;
	}


	@Id
	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}



	@Column
	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}

	@Column(name="START_DATE")
	@Temporal(TemporalType.TIMESTAMP)
	@XmlJavaTypeAdapter(JsonDateAdapter.class)
	public Date getStartDate() {
		return startDate;
	}


	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	@Column
	public String getDescription() {
		return description;
	}

	@Column
	public void setDescription(String description) {
		this.description = description;
	}

	@Column
	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	@Column
	public String getAttendance() {
		return attendance;
	}

	public void setAttendance(String attendance) {
		this.attendance = attendance;
	}

	@Column
	public Float getPrice() {
		return price;
	}

	public void setPrice(Float price) {
		this.price = price;
	}

	@Column
	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	@Column
	public Long getOwner() {
		return owner;
	}

	public void setOwner(Long owner) {
		this.owner = owner;
	}

	@Column(name="process_date")
	@Temporal(TemporalType.TIMESTAMP)
	@XmlJavaTypeAdapter(JsonDateAdapter.class)
	public Date getProcessDate() {
		return processDate;
	}

	public void setProcessDate(Date processDate) {
		this.processDate = processDate;
	}

	@Column
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	
	@ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
	@JoinColumn(name = "artist_fk", nullable = true)
	public Artist getArtist() {
		return artist;
	}

	public void setArtist(Artist artist) {
		this.artist = artist;
	}

	@ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
	@JoinColumn(name = "venue_fk", nullable = true)
	public Venue getVenue() {
		return venue;
	}


	public void setVenue(Venue venue) {
		this.venue = venue;
	}


	@Column
	public Integer getStatus() {
		return status;
	}



	public void setStatus(Integer status) {
		this.status = status;
	}


	@Column
	public Integer getSyncStatus() {
		return syncStatus;
	}



	public void setSyncStatus(Integer syncStatus) {
		this.syncStatus = syncStatus;
	}



	@Override
	public String toString() {
		return "Event [id=" + id + ", title=" + title + ", startDate="
				+ startDate + ", description=" + description + ", image="
				+ Arrays.toString(image) + ", attendance=" + attendance
				+ ", price=" + price + ", tag=" + tag + ", status=" + status
				+ ", owner=" + owner + ", processDate=" + processDate
				+ ", url=" + url + ", syncStatus=" + syncStatus + ", artist="
				+ artist + ", venue=" + venue + "]";
	}



	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}



	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Event other = (Event) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}


	


		
//	private List<User> users = new ArrayList<User>();
//	@ManyToMany(
//			fetch=FetchType.EAGER,
//			targetEntity=com.mobileApps.server.domain.User.class,
//			cascade={CascadeType.PERSIST, CascadeType.MERGE})
//	@JoinTable(name="user_event", 
//			   joinColumns= @JoinColumn(name="event_id",referencedColumnName="id", nullable=false), 
//			   inverseJoinColumns= @JoinColumn(name="user_id", referencedColumnName="id", nullable=false)
//	)
//	public List<User> getUsers() {
//		return users;
//	}
//
//
//
//	public void setUsers(List<User> users) {
//		this.users = users;
//	}
	
	

	





	//	@PrePersist
//	public void test(){
//		System.out.println("***********************");
//		//SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MMM-dd hh:mm:ss"); 
//		//this.setProcessDate(sdf.format(new Date()));
//		this.setProcessDate(new Date());
//
//	}



}

