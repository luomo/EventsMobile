package com.mobileApps.server.domain;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement(name = "location")
@Embeddable
public class Location {

	private String city;
	private String country; 
	private String street;
	private String postalCode;
	private Float latitude;
	private Float longitude;
	
	public Location(){}
	

	public Location(String city, String country, String street,
			String postalCode, Float latitude, Float longitude) {
		super();
		this.city = city;
		this.country = country;
		this.street = street;
		this.postalCode = postalCode;
		this.latitude = latitude;
		this.longitude = longitude;
	}


	@Column
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	
	@Column
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	
	@Column
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}

	@Column
	public String getPostalCode() {
		return postalCode;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	
	@Column
	public Float getLatitude() {
		return latitude;
	}
	public void setLatitude(Float latitude) {
		this.latitude = latitude;
	}
	
	@Column
	public Float getLongitude() {
		return longitude;
	}
	public void setLongitude(Float longitude) {
		this.longitude = longitude;
	}
	
	@Override
	public String toString() {
		return "Location [city=" + city + ", country=" + country + ", street="
				+ street + ", postalCode=" + postalCode + ", latitude="
				+ latitude + ", longitude=" + longitude + "]";
	}
	
	
	
	
}
