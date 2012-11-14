/**
 *
 */
package com.mobileApps.server.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlType;


@Entity
@XmlType(name = "artist")
public class Artist implements Serializable {

	
	private Long id;
	private String artist;

	
	public Artist(){}

	
	public Artist(Long id, String artist) {
		super();
		this.id = id;
		this.artist = artist;
	}



	@Id
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	@Column
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

