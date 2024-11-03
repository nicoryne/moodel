package com.g1appdev.Moodel.entity;

import jakarta.persistence.Entity;

import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="individualsubmissions")
public class IndividualSubmissions {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int submissionId;
    private int projectId;
    private String submissionDate;
    private String feedback;
    private String fileURL;
    private String description;
    private int accumulatedPoints;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "studentId")
    private Student student;

    public IndividualSubmissions() {
        super();
    }

    public IndividualSubmissions(int submissionId, int projectId, String submissionDate, String feedback, String fileURL, String description, int accumulatedPoints) {
        super();
        this.submissionId = submissionId;
        this.projectId = projectId;
        this.submissionDate = submissionDate;
        this.feedback = feedback;
        this.fileURL = fileURL;
        this.description = description;
        this.accumulatedPoints = accumulatedPoints;
    }

    public int getSubmissionId() {
        return submissionId;
    }

    public void setSubmissionId(int submissionId) {
        this.submissionId = submissionId;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public String getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(String submissionDate) {
        this.submissionDate = submissionDate;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public String getFileURL() {
        return fileURL;
    }

    public void setFileURL(String fileURL) {
        this.fileURL = fileURL;
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

}