package com.g1appdev.Moodel.entity.student;

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
@Table(name = "student_course_enrollments")
public class StudentCourseEnrollment {

    @EmbeddedId
    private StudentCourseEnrollmentKey studentCourseId;

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name = "student_id", referencedColumnName = "studentId")
    @JsonIgnoreProperties({"courseEnrollments", "individualSubmissions"}) 
    Student student;

    @ManyToOne
    @MapsId("courseId")
    @JoinColumn(name = "course_id", referencedColumnName = "courseId")
    @JsonIgnoreProperties({"enrolledStudents", "ownedByTeachers"}) 
    Course course;

    private Date createdAt;

    private boolean isVerified;

    public StudentCourseEnrollment() {}

    public StudentCourseEnrollment(StudentCourseEnrollmentKey studentCourseId, Student student, 
                                   Course course, Date createdAt, boolean isVerified) {
        this.studentCourseId = studentCourseId;
        this.student = student;
        this.course = course;
        this.createdAt = createdAt;
        this.isVerified = isVerified;
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

    public boolean getIsVerified() {
        return this.isVerified;
    }

    public void setIsVerified(boolean isVerified) {
        this.isVerified = isVerified;
    }

}
