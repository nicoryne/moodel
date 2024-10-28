package com.g1appdev.Moodel.Entity;

import jakarta.persistence.Entity;

import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name="projects")
public class ProjectsEntity {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int projectId;

    private String title;
    private String description;
    private String submissionDeadline;
    private boolean isTurnedIn;
    private int attainedPoints;
    private int totalPoints;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "courseId")
    private CourseEntity course;

    public ProjectsEntity() {
        super();
    }

    public ProjectsEntity(int projectId, CourseEntity course, String title, String description, String submissionDeadline, boolean isTurnedIn, int attainedPoints, int totalPoints) {
        super();
        this.projectId = projectId;
        this.course = course; 
        this.title = title;
        this.description = description;
        this.submissionDeadline = submissionDeadline;
        this.isTurnedIn = isTurnedIn;
        this.attainedPoints = attainedPoints;
        this.totalPoints = totalPoints;
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

	public String getSubmissionDeadline() {
		return submissionDeadline;
	}

	public void setSubmissionDeadline(String submissionDeadline) {
		this.submissionDeadline = submissionDeadline;
	}

	public boolean isTurnedIn() {
		return isTurnedIn;
	}

	public void setTurnedIn(boolean isTurnedIn) {
		this.isTurnedIn = isTurnedIn;
	}

	public int getAttainedPoints() {
		return attainedPoints;
	}

	public void setAttainedPoints(int attainedPoints) {
		this.attainedPoints = attainedPoints;
	}

	public int getTotalPoints() {
		return totalPoints;
	}

	public void setTotalPoints(int totalPoints) {
		this.totalPoints = totalPoints;
	}
	
	public CourseEntity getCourse() {
		return course;
	}

	public void setCourse(CourseEntity course) {
		this.course = course;
	}
}
