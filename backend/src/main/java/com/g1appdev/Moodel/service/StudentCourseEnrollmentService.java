package com.g1appdev.Moodel.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.g1appdev.Moodel.entity.StudentCourseEnrollment;
import com.g1appdev.Moodel.entity.StudentCourseEnrollmentKey;
import com.g1appdev.Moodel.respository.StudentCourseEnrollmentRepo;

@Service
public class StudentCourseEnrollmentService {

    @Autowired
    private StudentCourseEnrollmentRepo enrollmentRepo;

    public StudentCourseEnrollment postStudentCourseEnrollment(StudentCourseEnrollment enrollment) {
        return enrollmentRepo.save(enrollment);
    }

    public List<StudentCourseEnrollment> getAllEnrollments() {
        return enrollmentRepo.findAll();
    }

    public void deleteEnrollment(StudentCourseEnrollmentKey id) {
        enrollmentRepo.deleteById(id);
    }
}