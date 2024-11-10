package com.g1appdev.Moodel.entity;


import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="groupsubmissions")
public class GroupSubmissions {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int submissionId;

    private Date submissionDate;
    private String feedback;
    private String fileUrl;
    private String description;
    private int accumulatedPoints;

    @OneToMany(mappedBy = "groupSubmissions")
    private List<Projects> projects;

    @ManyToOne
    @JoinColumn(name = "groupId")
    @JsonIgnore
    private Group group;

    public GroupSubmissions() {        
    }

    public GroupSubmissions(int accumulatedPoints, String description, String feedback, String fileUrl, Group group, List<Projects> projects, Date submissionDate, int submissionId) {
        this.accumulatedPoints = accumulatedPoints;
        this.description = description;
        this.feedback = feedback;
        this.fileUrl = fileUrl;
        this.group = group;
        this.projects = projects;
        this.submissionDate = submissionDate;
        this.submissionId = submissionId;
    }

    public int getSubmissionId() {
        return submissionId;
    }

    public void setSubmissionId(int submissionId) {
        this.submissionId = submissionId;
    }

    public Date getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(Date submissionDate) {
        this.submissionDate = submissionDate;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAccumulatedPoints() {
        return accumulatedPoints;
    }

    public void setAccumulatedPoints(int accumulatedPoints) {
        this.accumulatedPoints = accumulatedPoints;
    }

    public List<Projects> getProjects() {
        return projects;
    }

    public void setProjects(List<Projects> projects) {
        this.projects = projects;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

}
