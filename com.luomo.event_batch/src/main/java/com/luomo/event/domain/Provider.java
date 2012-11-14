/**
 *
 */
package com.luomo.event.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlType;

@Entity
@XmlType(name = "provider")
public class Provider implements Serializable {

	
	private Long id;
	private String name;
	private String url;
	private String processDate;
	
	
	@Id
	@GeneratedValue
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
	
	@Column(name="PROCESS_DATE")
	public String getProcessDate() {
		return processDate;
	}
	public void setProcessDate(String processDate) {
		this.processDate = processDate;
	}
	@Override
	public String toString() {
		return "Provider [id=" + id + ", name=" + name + ", url=" + url
				+ ", processDate=" + processDate + "]";
	}
	
	
	
	
	
}

