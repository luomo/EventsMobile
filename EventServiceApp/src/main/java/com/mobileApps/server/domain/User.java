package com.mobileApps.server.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement(name = "user")
public class User {

	private Long id;
	private String username;
	private String password;
	private List<Event> favourtites = new ArrayList<Event>();
	
	public User(){}
	
	public User(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	
	
	@Id
	@Column
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	@Column
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	

//	@ManyToMany(
//			mappedBy="users", 
//			fetch=FetchType.EAGER, 
//			cascade = {CascadeType.PERSIST, CascadeType.MERGE}, 
//			targetEntity=Event.class)
//	@ManyToMany( 
//			fetch=FetchType.EAGER, 
//			cascade = {CascadeType.PERSIST, CascadeType.MERGE}, 
//			targetEntity=Event.class)
	@OneToMany( 
			fetch=FetchType.EAGER, 
			cascade = {CascadeType.PERSIST, CascadeType.MERGE} 
			)
	@JoinTable(name="user_event", 
	   joinColumns= @JoinColumn(name="user_id",referencedColumnName="id", nullable=false), 
	   inverseJoinColumns= @JoinColumn(name="event_id", referencedColumnName="id", nullable=false)
	)
	public List<Event> getFavourtites() {
		return favourtites;
	}

	public void setFavourtites(List<Event> favourtites) {
		this.favourtites = favourtites;
	}

	@Override
	public String toString() {
		return "User [username=" + username + ", password=" + password
				+ "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	
}
