package com.g1appdev.Moodel.entity;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Projects {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;

    private String title;
    private String description;
    private Date submissionDeadline;
    private int totalPoints;
    private boolean isGroupProject;
    private boolean isActive;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    // Getters and Setters
    public Long getProjectId() { 
        return projectId; 
    }

    public void setProjectId(Long projectId) { 
        this.projectId = projectId; 
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
}         