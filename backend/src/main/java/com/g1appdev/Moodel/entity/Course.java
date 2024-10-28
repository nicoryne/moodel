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
@Table(name="Courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int courseId;

    private String title;
    private String description;
    private Date createdAt;

    @OneToMany(mappedBy = "course")
    @JsonIgnoreProperties("courses")
    private Set<TeacherCourseOwnership> ownedByTeachers;

    public Course() {}

    public Course(String title, String description, Date createdAt) {
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.ownedByTeachers = new HashSet<>();
    }

    public int getCourseId() {
        return this.courseId;
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

    public Set<TeacherCourseOwnership> getOwnedByTeachers() {
        return this.ownedByTeachers;
    }
    
}
