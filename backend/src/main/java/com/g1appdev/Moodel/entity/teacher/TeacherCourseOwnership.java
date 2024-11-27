package com.g1appdev.Moodel.entity.teacher;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.g1appdev.Moodel.entity.course.Course;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name="teacher_course_ownerships")
public class TeacherCourseOwnership {

    @EmbeddedId
    private TeacherCourseOwnershipKey teacherCourseId;

    @ManyToOne
    @MapsId("teacherId")
    @JoinColumn(name = "teacher_id", referencedColumnName="teacherId")
    @JsonIgnoreProperties("ownedCourses")
    Teacher teacher;

    @ManyToOne
    @MapsId("courseId")
    @JoinColumn(name = "course_id", referencedColumnName="courseId")
    @JsonIgnoreProperties("ownedByTeachers")
    Course course;

    private Date createdAt;

    public TeacherCourseOwnership() {}


    public TeacherCourseOwnership(TeacherCourseOwnershipKey teacherCourseId, Teacher teacher, Course course, Date createdAt) {
        this.teacherCourseId = teacherCourseId;
        this.teacher = teacher;
        this.course = course;
        this.createdAt = createdAt;
    }


    public TeacherCourseOwnershipKey getTeacherCourseId() {
        return this.teacherCourseId;
    }

    public void setTeacherCourseId(TeacherCourseOwnershipKey teacherCourseId) {
        this.teacherCourseId = teacherCourseId;
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

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

}
