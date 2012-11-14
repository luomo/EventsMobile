/**
 *
 */
package com.mobileApps.server.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlType;


@Entity
@XmlType(name = "provider")
public class Provider implements Serializable {

	
	private Long id;
	private String name;
	private String url;
	private Date processDate;
	
	
	public Provider(){}


	public Provider(Long id, String name, String url, Date processDate) {
		super();
		this.id = id;
		this.name = name;
		this.url = url;
		this.processDate = processDate;
	}



	@Id
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	@Column
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	

	@Column
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
	@Column(name="process_date")
	@Temporal(TemporalType.TIMESTAMP)
	public Date getProcessDate() {
		return processDate;
	}
	public void setProcessDate(Date processDate) {
		this.processDate = processDate;
	}
	
	@Override
	public String toString() {
		return "Provider [id=" + id + ", name=" + name + ", url=" + url
				+ ", processDate=" + processDate + "]";
	}
	

}

