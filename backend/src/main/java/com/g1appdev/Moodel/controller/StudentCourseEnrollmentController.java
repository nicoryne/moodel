package com.g1appdev.Moodel.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.g1appdev.Moodel.entity.StudentCourseEnrollment;
import com.g1appdev.Moodel.entity.StudentCourseEnrollmentKey;
import com.g1appdev.Moodel.service.StudentCourseEnrollmentService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/studentCourseEnrollment")
public class StudentCourseEnrollmentController {

    @Autowired
    private StudentCourseEnrollmentService enrollmentService;

    @PostMapping("/enroll")
    public StudentCourseEnrollment enrollStudent(@RequestBody StudentCourseEnrollment enrollment) {
        return enrollmentService.postStudentCourseEnrollment(enrollment);
    }

    @GetMapping("/getAllEnrollments")
    public List<StudentCourseEnrollment> getAllEnrollments() {
        return enrollmentService.getAllEnrollments();
    }

    @DeleteMapping("/deleteEnrollment")
    public void deleteEnrollment(@RequestBody StudentCourseEnrollmentKey id) {
        enrollmentService.deleteEnrollment(id);
    }
}