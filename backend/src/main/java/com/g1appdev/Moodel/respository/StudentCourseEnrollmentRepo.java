package com.g1appdev.Moodel.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.g1appdev.Moodel.entity.StudentCourseEnrollment;
import com.g1appdev.Moodel.entity.StudentCourseEnrollmentKey;

@Repository
public interface StudentCourseEnrollmentRepo extends JpaRepository<StudentCourseEnrollment, StudentCourseEnrollmentKey> {

    List<StudentCourseEnrollment> findByStudent_StudentId(int studentId);

    List<StudentCourseEnrollment> findByCourse_CourseId(int courseId);
}
