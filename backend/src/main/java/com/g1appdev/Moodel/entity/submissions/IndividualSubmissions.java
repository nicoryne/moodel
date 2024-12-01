package com.g1appdev.Moodel.entity.submissions;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.g1appdev.Moodel.entity.project.Projects;
import com.g1appdev.Moodel.entity.student.Student;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "individual_submissions")
public class IndividualSubmissions extends Submissions {

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name = "student_id", referencedColumnName="studentId")
    @JsonIgnoreProperties("individualSubmissions")
    private Student ownedByStudent;

    public IndividualSubmissions() {}

    public IndividualSubmissions(int submissionId, Date submissionDate, String feedback, String fileURL,
            String description, int accumulatedPoints, Projects assignedToProject, Student ownedByStudent) {
        super(submissionId, submissionDate, feedback, fileURL, description, accumulatedPoints, assignedToProject);
        this.ownedByStudent = ownedByStudent;
    }
    
    public Student getOwnedByStudent() {
        return this.ownedByStudent;
    }

    public void setOwnedByStudent(Student ownedByStudent) {
        this.ownedByStudent = ownedByStudent;
    }
}
