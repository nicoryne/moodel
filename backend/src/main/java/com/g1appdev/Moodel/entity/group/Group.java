package com.g1appdev.Moodel.entity.group;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.g1appdev.Moodel.entity.submissions.GroupSubmissions;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "student_groups")
public class Group {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int groupId;

    private int groupNumber;

    @OneToMany(mappedBy = "ownedByGroup", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("ownedByGroup")
    private Set<GroupSubmissions> groupSubmissions = new HashSet<>();

    public Group() {}

    public Group(int groupId, int groupNumber) {
        this.groupId = groupId;
        this.groupNumber = groupNumber;
    }


    public int getGroupId() {
        return this.groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    public int getGroupNumber() {
        return this.groupNumber;
    }

    public void setGroupNumber(int groupNumber) {
        this.groupNumber = groupNumber;
    }

    public Set<GroupSubmissions> getGroupSubmissions() {
        return this.groupSubmissions;
    }

    public void setGroupSubmissions(Set<GroupSubmissions> groupSubmissions) {
        this.groupSubmissions = groupSubmissions;
    }
}
