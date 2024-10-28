package com.g1appdev.Moodel.entity;

import jakarta.persistence.*;
import java.util.Date;

import javax.swing.GroupLayout.Group;

@Entity
public class GroupSubmissions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long submissionId;

    private Date submissionDate;
    private String feedback;
    private String fileURL;
    private String description;
    private int accumulatedPoints;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    // Getters and Setters
    public Long getSubmissionId() { 
        return submissionId; 
    }

    public void setSubmissionId(Long submissionId) { 
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

    public Group getGroup() { 
        return group; 
    }

    public void setGroup(Group group) { 
        this.group = group; 
    }
}
