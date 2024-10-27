package com.g1appdev.Moodel.entity;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="groups")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int groupId;
    
    private int groupNumber;

    
    @ManyToMany
    @JoinTable(
        name = "groupstudentassignation",
        joinColumns = @JoinColumn(name = "groupId"),
        inverseJoinColumns = @JoinColumn(name = "studentId")
    )
    @JsonIgnore
    private Set<Student> groupAssigned = new HashSet<>();

    public Group() {
        
    }

    public Group(int groupId, int groupNumber) {
        this.groupId = groupId;
        this.groupNumber = groupNumber;
        this.groupAssigned = new HashSet<>();
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

    public Set<Student> getGroupAssigned() {
        return groupAssigned;
    }

    public void setGroupAssigned(Set<Student> groupAssigned) {
        this.groupAssigned = groupAssigned;
    }
         

    
}