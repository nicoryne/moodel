package com.g1appdev.Moodel.entity;

import java.util.Date;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
<<<<<<< HEAD
@Table(name = "student_course_enrollment")
public class StudentCourseEnrollment {

    @EmbeddedId
    private StudentCourseEnrollmentKey id;  // Use a single composite key

    @ManyToOne
    @MapsId("studentId")  // Use the composite key’s studentId
=======
@Table(name = "StudentCourseEnrollment")
public class StudentCourseEnrollment {

    @EmbeddedId
    private StudentCourseEnrollmentKey studentCourseId;

    @ManyToOne
    @MapsId("studentId")
>>>>>>> bb4508a084c4a26c16d2d88cbd0f3d4f3b7ce6ce
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
<<<<<<< HEAD
    @MapsId("courseId")  // Use the composite key’s courseId
=======
    @MapsId("courseId")
>>>>>>> bb4508a084c4a26c16d2d88cbd0f3d4f3b7ce6ce
    @JoinColumn(name = "course_id")
    private Course course;

    private Date enrollmentDate;

    public StudentCourseEnrollment() {}

<<<<<<< HEAD
    public StudentCourseEnrollment(StudentCourseEnrollmentKey id, Student student, Course course, Date enrollmentDate) {
        this.id = id;
=======
    public StudentCourseEnrollment(StudentCourseEnrollmentKey studentCourseId, Student student, Course course, Date enrollmentDate) {
        this.studentCourseId = studentCourseId;
>>>>>>> bb4508a084c4a26c16d2d88cbd0f3d4f3b7ce6ce
        this.student = student;
        this.course = course;
        this.enrollmentDate = enrollmentDate;
    }

<<<<<<< HEAD
    public StudentCourseEnrollmentKey getId() {
        return id;
    }

    public void setId(StudentCourseEnrollmentKey id) {
        this.id = id;
=======
    public StudentCourseEnrollmentKey getStudentCourseId() {
        return studentCourseId;
    }

    public void setStudentCourseId(StudentCourseEnrollmentKey studentCourseId) {
        this.studentCourseId = studentCourseId;
>>>>>>> bb4508a084c4a26c16d2d88cbd0f3d4f3b7ce6ce
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
