/**
 *
 */
package com.luomo.event.domain;

import java.io.Serializable;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementRef;
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

@Entity
@XmlRootElement(name = "venue")
public class Venue implements Serializable {

	
	private Long id;
	private Location location;
	private String website;
	private String phoneNumber;
	private String image;

	
	@Id
	@GeneratedValue
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
	@XmlElement(name ="phonenumber")
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	@Embedded
	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	@Override
	public String toString() {
		return "Venue [id=" + id + ", location=" + location + ", website="
				+ website + ", phoneNumber=" + phoneNumber + ", image=" + image
				+ "]";
	}
	
	
	
}

