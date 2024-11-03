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
    private StudentCourseEnrollmentKey studentCourseId;

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name = "student_id", referencedColumnName = "studentId")
    private Student student;

    @ManyToOne
    @MapsId("courseId")
    @JoinColumn(name = "course_id", referencedColumnName = "courseId")
    private Course course;

    private Date enrollmentDate;

    public StudentCourseEnrollment() {}

    public StudentCourseEnrollment(StudentCourseEnrollmentKey studentCourseId, Student student, 
                                   Course course, Date enrollmentDate) {
        this.studentCourseId = studentCourseId;
        this.student = student;
        this.course = course;
        this.enrollmentDate = enrollmentDate;
    }

    public StudentCourseEnrollmentKey getStudentCourseId() {
        return studentCourseId;
    }

    public void setStudentCourseId(StudentCourseEnrollmentKey studentCourseId) {
        this.studentCourseId = studentCourseId;
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
