/**
 *
 */
package com.mobileApps.server.domain;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
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

	
	public static enum Order implements Comparator<Venue>{
		ByName {
			@Override
			public int compare(Venue v_1, Venue v_2) {				
				return v_1.getName().compareTo(v_2.getName());
			}
		};
	
		
		public abstract int compare(Venue lhs, Venue rhs);

		public Comparator<Venue> ascending() {
			return this;
		}

		public Comparator<Venue> descending() {
			return Collections.reverseOrder(this);
		}


	}
	
	
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



	@Id
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	@Column
	public String getWebsite() {
		return website;
	}
	public void setWebsite(String website) {
		this.website = website;
	}
	@Column
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


	@Column
	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}


	@Column
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

