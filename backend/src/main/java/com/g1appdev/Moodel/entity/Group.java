package com.g1appdev.Moodel.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "studentgroups")
public class Group {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int groupId;

    private int groupNumber;


    @OneToMany(mappedBy="group")
    @JsonIgnore
    private List<GroupSubmissions> groupSubmissions;

    public Group() {}

    public Group(int groupId, int groupNumber, List<GroupSubmissions> groupSubmissions) {
        this.groupId = groupId;
        this.groupNumber = groupNumber;
        this.groupSubmissions = groupSubmissions;
    }

    public int getGroupId() {
        return groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    public int getGroupNumber() {
        return groupNumber;
    }

    public void setGroupNumber(int groupNumber) {
        this.groupNumber = groupNumber;
    }

    public List<GroupSubmissions> getGroupSubmissions() {
        return groupSubmissions;
    }

    public void setGroupSubmissions(List<GroupSubmissions> groupSubmissions) {
        this.groupSubmissions = groupSubmissions;
    }

}
