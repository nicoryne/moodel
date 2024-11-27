package com.g1appdev.Moodel.entity.submissions;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.g1appdev.Moodel.entity.project.Projects;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name="submissions")
public class Submissions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int submissionId;

    private Date submissionDate;
    private String feedback;
    private String fileURL;
    private String description;
    private int accumulatedPoints;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName="projectId")
    private Projects assignedToProject;

    public Submissions() {}

 
    public Submissions(int accumulatedPoints, Projects assignedToProject, String description, String feedback, String fileURL, Date submissionDate, int submissionId) {
        this.accumulatedPoints = accumulatedPoints;
        this.assignedToProject = assignedToProject;
        this.description = description;
        this.feedback = feedback;
        this.fileURL = fileURL;
        this.submissionDate = submissionDate;
        this.submissionId = submissionId;
    }


    public int getSubmissionId() {
        return this.submissionId;
    }

    public Date getSubmissionDate() {
        return this.submissionDate;
    }

    public void setSubmissionDate(Date submissionDate) {
        this.submissionDate = submissionDate;
    }

    public String getFeedback() {
        return this.feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public String getFileURL() {
        return this.fileURL;
    }

    public void setFileURL(String fileURL) {
        this.fileURL = fileURL;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAccumulatedPoints() {
        return this.accumulatedPoints;
    }

    public void setAccumulatedPoints(int accumulatedPoints) {
        this.accumulatedPoints = accumulatedPoints;
    }    

    public Projects getAssignedToProject() {
        return this.assignedToProject;
    }

    public void setAssignedToProject(Projects assignedToProject) {
        this.assignedToProject = assignedToProject;
    }

    public void setSubmissionId(int submissionId) {
        this.submissionId = submissionId;
    }
}
