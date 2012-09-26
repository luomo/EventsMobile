/**
 *
 */
package com.mobileApps.server.ws.domain;

import java.io.Serializable;
import java.util.Arrays;
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


	private Long id;

	private String title;
	@XmlJavaTypeAdapter(JsonDateAdapter.class)
	private Date startDate;
	private String description;
	private byte[] image;
	private String attendance;
	private Float price;
	private String tag;
	
	//control fields
	private Long owner;
	@XmlJavaTypeAdapter(JsonDateAdapter.class)
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
	public void test(){
		System.out.println("***********************");
		//SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MMM-dd hh:mm:ss"); 
		//this.setProcessDate(sdf.format(new Date()));
		this.setProcessDate(new Date());

	}



}

