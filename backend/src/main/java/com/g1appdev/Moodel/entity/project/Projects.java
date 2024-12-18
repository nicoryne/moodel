package com.g1appdev.Moodel.entity.project;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.g1appdev.Moodel.entity.course.Course;
import com.g1appdev.Moodel.entity.group.Group;
import com.g1appdev.Moodel.entity.student.Student;
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
    private Date createdAt;

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

    public Projects(Course course, String description, boolean isActive, boolean isGroupProject, int projectId, Date submissionDeadline, String title, int totalPoints, Date createdAt) {
        this.course = course;
        this.description = description;
        this.isActive = isActive;
        this.isGroupProject = isGroupProject;
        this.projectId = projectId;
        this.submissionDeadline = submissionDeadline;
        this.title = title;
        this.totalPoints = totalPoints;
        this.createdAt = createdAt;
    }

    public int getProjectId() {
        return projectId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getSubmissionDeadline() {
        return submissionDeadline;
    }

    public void setSubmissionDeadline(Date submissionDeadline) {
        this.submissionDeadline = submissionDeadline;
    }

    public int getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(int totalPoints) {
        this.totalPoints = totalPoints;
    }

    public boolean isGroupProject() {
        return isGroupProject;
    }

    public void setGroupProject(boolean groupProject) {
        isGroupProject = groupProject;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Set<Submissions> getSubmissions() {
        return submissions;
    }

    public void setSubmissions(Set<Submissions> submissions) {
        this.submissions = submissions;
    }

    public Set<Group> getGroups() {
        return this.groups;
    }

    
    public void setGroups(Set<Group> groups) {
        this.groups = groups;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public boolean isIsGroupProject() {
        return this.isGroupProject;
    }

    public boolean getIsGroupProject() {
        return this.isGroupProject;
    }

    public void setIsGroupProject(boolean isGroupProject) {
        this.isGroupProject = isGroupProject;
    }

    public boolean isIsActive() {
        return this.isActive;
    }

    public boolean getIsActive() {
        return this.isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
 }
