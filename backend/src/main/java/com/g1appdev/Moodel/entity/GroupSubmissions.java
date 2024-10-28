package com.g1appdev.Moodel.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    private int accumilatedPoints;

    @ManyToOne
    @JoinColumn(name = "groupId", nullable=false)
    @JsonIgnore
    private Group group;

    public GroupSubmissions() {        
    }

    public GroupSubmissions(int accumilatedPoints, String description, String feedback, String fileUrl, Group group, Date submissionDate, int submissionId) {
        this.accumilatedPoints = accumilatedPoints;
        this.description = description;
        this.feedback = feedback;
        this.fileUrl = fileUrl;
        this.group = group;
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

    public int getAccumilatedPoints() {
        return accumilatedPoints;
    }

    public void setAccumilatedPoints(int accumilatedPoints) {
        this.accumilatedPoints = accumilatedPoints;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

}