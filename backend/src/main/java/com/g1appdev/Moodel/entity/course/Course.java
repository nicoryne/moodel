package com.g1appdev.Moodel.entity.course;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.g1appdev.Moodel.entity.project.Projects;
import com.g1appdev.Moodel.entity.student.StudentCourseEnrollment;
import com.g1appdev.Moodel.entity.teacher.TeacherCourseOwnership;

import jakarta.persistence.CascadeType;
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

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("course")
    private Set<StudentCourseEnrollment> enrolledStudents = new HashSet<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("course")
    private Set<TeacherCourseOwnership> ownedByTeachers = new HashSet<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("course")
    private Set<Projects> projects = new HashSet<>();

    public Course() {}

    public Course(String title, String description, Date createdAt) {
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
    }


    public int getCourseId() {
        return this.courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Set<StudentCourseEnrollment> getEnrolledStudents() {
        return this.enrolledStudents;
    }

    public void setEnrolledStudents(Set<StudentCourseEnrollment> enrolledStudents) {
        this.enrolledStudents = enrolledStudents;
    }

    public Set<TeacherCourseOwnership> getOwnedByTeachers() {
        return this.ownedByTeachers;
    }

    public void setOwnedByTeachers(Set<TeacherCourseOwnership> ownedByTeachers) {
        this.ownedByTeachers = ownedByTeachers;
    }

    public Set<Projects> getProjects() {
        return this.projects;
    }

    public void setProjects(Set<Projects> projects) {
        this.projects = projects;
    }

   
}
