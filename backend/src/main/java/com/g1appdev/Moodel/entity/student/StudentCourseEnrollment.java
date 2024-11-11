package com.g1appdev.Moodel.entity.student;

import java.util.Date;

import com.g1appdev.Moodel.entity.course.Course;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "student_course_enrollments")
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

    private Date createdAt;

    public StudentCourseEnrollment() {}

    public StudentCourseEnrollment(StudentCourseEnrollmentKey studentCourseId, Student student, 
                                   Course course, Date createdAt) {
        this.studentCourseId = studentCourseId;
        this.student = student;
        this.course = course;
        this.createdAt = createdAt;
    }


    public StudentCourseEnrollmentKey getStudentCourseId() {
        return this.studentCourseId;
    }

    public void setStudentCourseId(StudentCourseEnrollmentKey studentCourseId) {
        this.studentCourseId = studentCourseId;
    }

    public Student getStudent() {
        return this.student;
    }

    public void setStudent(Student student) {
        this.student = student;
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
