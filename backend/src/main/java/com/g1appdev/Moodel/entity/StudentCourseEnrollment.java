package com.g1appdev.Moodel.entity;

import java.util.Date;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "student_course_enrollment")
public class StudentCourseEnrollment {

    @EmbeddedId
    private StudentCourseEnrollmentKey id;  // Use a single composite key

    @ManyToOne
    @MapsId("studentId")  // Use the composite key’s studentId
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @MapsId("courseId")  // Use the composite key’s courseId
    @JoinColumn(name = "course_id")
    private Course course;

    private Date enrollmentDate;

    public StudentCourseEnrollment() {}

    public StudentCourseEnrollment(StudentCourseEnrollmentKey id, Student student, Course course, Date enrollmentDate) {
        this.id = id;
        this.student = student;
        this.course = course;
        this.enrollmentDate = enrollmentDate;
    }

    public StudentCourseEnrollmentKey getId() {
        return id;
    }

    public void setId(StudentCourseEnrollmentKey id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Date getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(Date enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }
}
