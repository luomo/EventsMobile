package com.mobileApps.server.ws.domain;

public class Feed {

	private Long id ;  
    private String name;
    private String url;
    private String configFileName; 
    private String configFileLocation;
    private String method; 
    private Integer status;
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
	public String getConfigFileName() {
		return configFileName;
	}
	public void setConfigFileName(String configFileName) {
		this.configFileName = configFileName;
	}
	public String getConfigFileLocation() {
		return configFileLocation;
	}
	public void setConfigFileLocation(String configFileLocation) {
		this.configFileLocation = configFileLocation;
	}
	public String getMethod() {
		return method;
	}
	public void setMethod(String method) {
		this.method = method;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Feeds [id=" + id + ", name=" + name + ", url=" + url
				+ ", configFileName=" + configFileName
				+ ", configFileLocation=" + configFileLocation + ", method="
				+ method + ", status=" + status + "]";
	}
    
    
}
