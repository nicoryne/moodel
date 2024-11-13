package com.g1appdev.Moodel.respository.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g1appdev.Moodel.entity.student.StudentCourseEnrollment;
import com.g1appdev.Moodel.entity.student.StudentCourseEnrollmentKey;

import java.util.Date;
import java.util.List;

@Repository
public interface StudentCourseEnrollmentRepo extends JpaRepository<StudentCourseEnrollment, StudentCourseEnrollmentKey> {

    public List<StudentCourseEnrollment> findByCreatedAt(Date createdAt);

    public List<StudentCourseEnrollment> findByStudent_StudentId(Integer studentId);

    public List<StudentCourseEnrollment> findByCourse_CourseId(Integer courseId);
    
}
