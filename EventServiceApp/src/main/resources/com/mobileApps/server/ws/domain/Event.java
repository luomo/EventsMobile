/**
 *
 */
package com.mobileApps.server.ws.domain;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

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
	private String startDate;
	private String description;
	private String image;
	private String attendance;
	private String tag;
	private String url;
	private String website;


	private Artist artists;
	private Venue venue;
	private Provider provider;
	

	public Event() {
	}
	
	public Event(Long id, String title, String startDate, String description,
			String image, String attendance, String tag, String url,
			String website, Artist artists, Venue venue, Provider provider ) {
		super();
		this.id = id;
		this.title = title;
		this.startDate = startDate;
		this.description = description;
		this.image = image;
		this.attendance = attendance;
		this.tag = tag;
		this.url = url;
		this.website = website;
		this.artists = artists;
		this.venue = venue;
		this.provider = provider;
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


	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}


	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}


	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}


	public String getAttendance() {
		return attendance;
	}
	public void setAttendance(String attendance) {
		this.attendance = attendance;
	}


	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}


	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}


	public String getWebsite() {
		return website;
	}
	public void setWebsite(String website) {
		this.website = website;
	}


	public Provider getProvider() {
		return provider;
	}
	public void setProvider(Provider provider) {
		this.provider = provider;
	}


	public Venue getVenue() {
		return venue;
	}

	public void setVenue(Venue venue) {
		this.venue = venue;
	}


	public Artist getArtists() {
		return artists;
	}
	public void setArtists(Artist artists) {
		this.artists = artists;
	}



	@Override
	public String toString() {
		return "Event [id=" + id + ", title=" + title + ", startDate="
				+ startDate + ", description=" + description + ", image="
				+ image + ", attendance=" + attendance + ", tag=" + tag
				+ ", url=" + url + ", website=" + website + ", artists="
				+ artists + ", venue=" + venue + ", provider=" + provider + "]";
	}
	
	//	@PrePersist
	public void test(){
		System.out.println("***********************");
		if(provider == null) {
			provider = new Provider();
			provider.setName("test");
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MMM-dd hh:mm:ss"); 
			provider.setProcessDate(sdf.format(new Date()));
			provider.setUrl(this.getUrl());
		}
	}



}

