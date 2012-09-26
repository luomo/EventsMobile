/**
 *
 */
package com.mobileApps.server.ws.domain;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlType;


@XmlType(name = "provider")
public class Provider implements Serializable {

	
	private Long id;
	private String name;
	private String url;
	private String processDate;
	
	
	public Provider(){}


	public Provider(Long id, String name, String url, String processDate) {
		super();
		this.id = id;
		this.name = name;
		this.url = url;
		this.processDate = processDate;
	}



	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	

	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
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

