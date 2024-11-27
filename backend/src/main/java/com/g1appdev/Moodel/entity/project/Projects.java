package com.g1appdev.Moodel.entity.project;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.g1appdev.Moodel.entity.course.Course;
import com.g1appdev.Moodel.entity.group.Group;
import com.g1appdev.Moodel.entity.submissions.Submissions;

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
@Table(name = "projects")
public class Projects {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int projectId;

    private String title;
    private String description;
    private Date submissionDeadline;
    private int totalPoints;
    private boolean isGroupProject;
    private boolean isActive;

    @ManyToOne
    @JoinColumn(name="course_id", referencedColumnName = "courseId")
    private Course course;

    @OneToMany(mappedBy = "assignedToProject", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("assignedToProject")
    private Set<Submissions> submissions = new HashSet<>();

    @OneToMany(mappedBy = "groupProject", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("groupProject")
    private Set<Group> groups = new HashSet<>();

    public Projects() {}

    
    public Projects(int projectId, String title, String description, Date submissionDeadline, int totalPoints,
            boolean isGroupProject, boolean isActive, Course course, Set<Submissions> submissions, Set<Group> groups) {
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.submissionDeadline = submissionDeadline;
        this.totalPoints = totalPoints;
        this.isGroupProject = isGroupProject;
        this.isActive = isActive;
        this.course = course;
        this.submissions = submissions;
        this.groups = groups;
    }

    public int getProjectId() {
        return this.projectId;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getSubmissionDeadline() {
        return this.submissionDeadline;
    }

    public void setSubmissionDeadline(Date submissionDeadline) {
        this.submissionDeadline = submissionDeadline;
    }

    public int getTotalPoints() {
        return this.totalPoints;
    }

    public void setTotalPoints(int totalPoints) {
        this.totalPoints = totalPoints;
    }

    public boolean isGroupProject() {
        return this.isGroupProject;
    }

    public void setGroupProject(boolean groupProject) {
        this.isGroupProject = groupProject;
    }

    public boolean isActive() {
        return this.isActive;
    }

    public void setActive(boolean active) {
        this.isActive = active;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Set<Submissions> getSubmissions() {
        return this.submissions;
    }

    public Set<Group> getGroups() {
        return this.groups;
    }

    public boolean isIsGroupProject() {
        return this.isGroupProject;
    }

    public void setIsGroupProject(boolean isGroupProject) {
        this.isGroupProject = isGroupProject;
    }

    public boolean isIsActive() {
        return this.isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public void setSubmissions(Set<Submissions> submissions) {
        this.submissions = submissions;
    }  

    public void setGroups(Set<Group> groups) {
        this.groups = groups;
    }
 }
