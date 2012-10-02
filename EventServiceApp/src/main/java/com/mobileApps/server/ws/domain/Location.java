package com.mobileApps.server.ws.domain;

import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement(name = "location")
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


	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}

	public String getPostalCode() {
		return postalCode;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	public Float getLatitude() {
		return latitude;
	}
	public void setLatitude(Float latitude) {
		this.latitude = latitude;
	}
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
