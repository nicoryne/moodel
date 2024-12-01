package com.g1appdev.Moodel.entity.group;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.g1appdev.Moodel.entity.project.Projects;
import com.g1appdev.Moodel.entity.submissions.GroupSubmissions;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "student_groups")
public class Group {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int groupId;

    private int groupNumber;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("group")
    private Set<GroupStudentAssignation> studentsAssigned = new HashSet<>();

    @OneToMany(mappedBy = "ownedByGroup", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("ownedByGroup")
    private Set<GroupSubmissions> groupSubmissions = new HashSet<>();

    @ManyToOne
    @JoinColumn(name="project_id", referencedColumnName = "projectId")
    @JsonIgnoreProperties("groups")
    private Projects groupProject;

    public Group() {}

    public Group(int groupId, int groupNumber, Set<GroupStudentAssignation> studentsAssigned,
            Set<GroupSubmissions> groupSubmissions, Projects groupProject) {
        this.groupId = groupId;
        this.groupNumber = groupNumber;
        this.studentsAssigned = studentsAssigned;
        this.groupSubmissions = groupSubmissions;
        this.groupProject = groupProject;
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

    public Set<GroupStudentAssignation> getStudentsAssigned() {
        return studentsAssigned;
    }

    public void setStudentsAssigned(Set<GroupStudentAssignation> studentsAssigned) {
        this.studentsAssigned = studentsAssigned;
    }

    public Set<GroupSubmissions> getGroupSubmissions() {
        return groupSubmissions;
    }

    public void setGroupSubmissions(Set<GroupSubmissions> groupSubmissions) {
        this.groupSubmissions = groupSubmissions;
    }

    public Projects getGroupProject() {
        return groupProject;
    }

    public void setGroupProject(Projects groupProject) {
        this.groupProject = groupProject;
    }  

}
