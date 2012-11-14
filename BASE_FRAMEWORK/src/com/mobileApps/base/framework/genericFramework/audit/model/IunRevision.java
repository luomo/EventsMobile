package com.mobileApps.base.framework.genericFramework.audit.model;

import java.io.Serializable;
import java.text.DateFormat;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.envers.RevisionEntity;
import org.hibernate.envers.RevisionNumber;
import org.hibernate.envers.RevisionTimestamp;

import com.mobileApps.base.framework.genericFramework.audit.auditingService.IunRevisionListener;

@Entity
@RevisionEntity(IunRevisionListener.class)
@Table(name="IUN_REVISION")
public class IunRevision
	implements Serializable {

	private static final long serialVersionUID = -1610712736271302298L;

    @Id
    @GeneratedValue
    @RevisionNumber
    private int rev;

    @RevisionTimestamp
    private Date revDate;

    private String username;
    
    public int getRev() {
        return rev;
    }

    public void setRev(int rev) {
        this.rev = rev;
    }
 

    public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Temporal(TemporalType.TIMESTAMP)
    public Date getRevDate() {
		return revDate;
	}

	public void setRevDate(Date revDate) {
		this.revDate = revDate;
	}

	

	@Transient
    public Date getRevisionDate() {
        return revDate;
    }

   
	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + rev;
		result = prime * result
				+ ((revDate == null) ? 0 : revDate.hashCode());
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
		IunRevision other = (IunRevision) obj;
		if (rev != other.rev)
			return false;
		if (revDate == null) {
			if (other.revDate != null)
				return false;
		} else if (!revDate.equals(other.revDate))
			return false;
		return true;
	}

	public String toString() {
        return "IunRevisionEntity(id = " + rev + ", revisionDate = " + DateFormat.getDateTimeInstance().format(getRevisionDate()) + ", user: " + username + " )";
    }
}

