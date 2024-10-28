package com.g1appdev.Moodel.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

import com.g1appdev.Moodel.entity.StudentCourseEnrollment;
import com.g1appdev.Moodel.entity.StudentCourseEnrollmentKey;
import com.g1appdev.Moodel.respository.StudentCourseEnrollmentRepo;

@Service
public class StudentCourseEnrollmentService {

    @Autowired
    private StudentCourseEnrollmentRepo enrollmentRepo;

    // CREATE
    public StudentCourseEnrollment createEnrollment(StudentCourseEnrollment enrollment) {
        return enrollmentRepo.save(enrollment);
    }

    // READ ALL
    public List<StudentCourseEnrollment> getAllEnrollments() {
        return enrollmentRepo.findAll();
    }

    // READ BY STUDENT ID
    public List<StudentCourseEnrollment> getEnrollmentsByStudentId(int studentId) {
        return enrollmentRepo.findByStudent_StudentId(studentId);
    }

    // READ BY COURSE ID
    public List<StudentCourseEnrollment> getEnrollmentsByCourseId(int courseId) {
        return enrollmentRepo.findByCourse_CourseId(courseId);
    }

    // DELETE
    public String deleteEnrollment(int studentId, int courseId) {
        StudentCourseEnrollmentKey enrollmentKey = new StudentCourseEnrollmentKey(studentId, courseId);

        StudentCourseEnrollment enrollment = enrollmentRepo.findById(enrollmentKey)
            .orElseThrow(() -> new NoSuchElementException(
                "🔴 ERROR: Enrollment with ID " + enrollmentKey + " not found."
            ));

        enrollmentRepo.deleteById(enrollmentKey);
        return "✅ SUCCESS: Enrollment with ID " + enrollmentKey + " has been successfully deleted.";
    }
}
