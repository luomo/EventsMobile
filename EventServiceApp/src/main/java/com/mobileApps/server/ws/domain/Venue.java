/**
 *
 */
package com.mobileApps.server.ws.domain;

import java.io.Serializable;
import java.util.Arrays;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 	<venue>
			<name>Barbican Centre</name>
			<location>
				<city>London</city>
				<country>United Kingdom</country>
				<street>Silk Street</street>
				<postalcode>EC2Y 8DS</postalcode>
				<geoPoint>
					<lat>51.519972</lat>
					<long>-0.09334</long>
				</geoPoint>
			</location>
			<url>http://www.last.fm/venue/8777860+Barbican+Centre</url>
			<website>http://www.barbican.org.uk</website>
			<phonenumber>+44 (0)20 7638 8891</phonenumber>
			<image size="small">http://userserve-ak.last.fm/serve/34/418510.jpg
			</image>
		</venue>
 */


@XmlRootElement(name = "venue")
public class Venue implements Serializable {

	
	private Long id;
	private String name;
	private Location location;
	private String website;
	private String phoneNumber;
	private byte[] image;

	
	public Venue(){}
	
	

	public Venue(Long id, String venueName, Location location, String website,
			String phoneNumber, byte[] image) {
		super();
		this.id = id;
		this.name = venueName;
		this.location = location;
		this.website = website;
		this.phoneNumber = phoneNumber;
		this.image = image;
	}



	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getWebsite() {
		return website;
	}
	public void setWebsite(String website) {
		this.website = website;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}


	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}


	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}



	public String getName() {
		return name;
	}



	public void setName(String venueName) {
		this.name = venueName;
	}



	@Override
	public String toString() {
		return "Venue [id=" + id + ", name=" + name + ", location=" + location
				+ ", website=" + website + ", phoneNumber=" + phoneNumber
				+ ", image=" + Arrays.toString(image) + "]";
	}

	
	
}

