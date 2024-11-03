package com.g1appdev.Moodel.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int courseId;

    private String title;
    private String description;
    private Date createdAt;

    @OneToMany(mappedBy = "course")
    private Set<StudentCourseEnrollment> enrolledStudents = new HashSet<>();

    @OneToMany(mappedBy = "course")
    @JsonIgnoreProperties("courses")
    private Set<TeacherCourseOwnership> ownedByTeachers = new HashSet<>();

    public Course() {}

    public Course(String title, String description, Date createdAt) {
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
    }

    public int getCourseId() {
        return courseId;
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

    public Date getCreatedAt() {
        return createdAt;
    }

    public Set<StudentCourseEnrollment> getEnrolledStudents() {
        return enrolledStudents;
    }

    public void setEnrolledStudents(Set<StudentCourseEnrollment> enrolledStudents) {
        this.enrolledStudents = enrolledStudents;
    }

    public Set<TeacherCourseOwnership> getOwnedByTeachers() {
        return ownedByTeachers;
    }
}
