/**
 *
 */
package com.mobileApps.server.ws.domain;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlType;


@XmlType(name = "artist")
public class Artist implements Serializable {

	
	private Long id;
	private String artist;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	

	public String getArtist() {
		return artist;
	}
	public void setArtist(String artist) {
		this.artist = artist;
	}
	@Override
	public String toString() {
		return "Artist [id=" + id + ", artist=" + artist + "]";
	}
	
	
	
}

