package com.g1appdev.Moodel.entity;

import java.util.Date;

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
    TeacherCourseOwnershipKey id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("teacherId")
    @JoinColumn(name = "teacherId", insertable = false, updatable = false)
    Teacher teacher;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("courseId")
    @JoinColumn(name = "courseId", insertable = false, updatable = false)
    Course course;

    private Date ownershipDate;

    public TeacherCourseOwnership() {}

    public TeacherCourseOwnership(Teacher teacher, Course course, Date ownershipDate) {
        this.id = new TeacherCourseOwnershipKey(teacher.getTeacherId(), course.getCourseId());
        this.teacher = teacher;
        this.course = course;
        this.ownershipDate = ownershipDate != null ? ownershipDate : new Date();
    }

    public TeacherCourseOwnershipKey getId() {
        return this.id;
    }

    public Teacher getTeacher() {
        return this.teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
        this.id.setTeacherId(teacher.getTeacherId());
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
        this.id.setCourseId(course.getCourseId());
    }

    public Date getOwnershipDate() {
        return this.ownershipDate;
    }

    public void setOwnershipDate(Date ownershipDate) {
        this.ownershipDate = ownershipDate;
    }

}
