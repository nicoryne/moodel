package com.g1appdev.Moodel.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name="TeacherCourseOwnership")
public class TeacherCourseOwnership {

    @EmbeddedId
    private TeacherCourseOwnershipKey teacherCourseId;

    @ManyToOne
    @MapsId("teacherId")
    @JoinColumn(name = "teacher_id")
    @JsonIgnoreProperties("ownedCourses")
    Teacher teacher;

    @ManyToOne
    @MapsId("courseId")
    @JoinColumn(name = "course_id")
    @JsonIgnoreProperties("ownedByTeachers")
    Course course;

    private Date ownershipDate;

    public TeacherCourseOwnership() {}


    public TeacherCourseOwnership(TeacherCourseOwnershipKey teacherCourseId, Teacher teacher, Course course, Date ownershipDate) {
        this.teacherCourseId = teacherCourseId;
        this.teacher = teacher;
        this.course = course;
        this.ownershipDate = ownershipDate;
    }


    public TeacherCourseOwnershipKey getTeacherCourseId() {
        return this.teacherCourseId;
    }

    public Teacher getTeacher() {
        return this.teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Date getOwnershipDate() {
        return this.ownershipDate;
    }

    public void setOwnershipDate(Date ownershipDate) {
        this.ownershipDate = ownershipDate;
    }

}
