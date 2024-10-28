package com.g1appdev.Moodel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.g1appdev.Moodel.entity.StudentCourseEnrollment;
import com.g1appdev.Moodel.entity.StudentCourseEnrollmentKey;
import com.g1appdev.Moodel.service.StudentCourseEnrollmentService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(method = RequestMethod.GET, path = "/api/studentCourseEnrollment")
public class StudentCourseEnrollmentController {

    @Autowired
    private StudentCourseEnrollmentService enrollmentService;

    @GetMapping("/testConnection")
    public String testConnection() {
        return "✅ SUCCESS: StudentCourseEnrollment API connected successfully!";
    }

    // CREATE
    @PostMapping("/create")
    public StudentCourseEnrollment createEnrollment(@RequestBody StudentCourseEnrollment enrollment) {
        return enrollmentService.createEnrollment(enrollment);
    }

    // READ ALL
    @GetMapping("/all")
    public List<StudentCourseEnrollment> getAllEnrollments() {
        return enrollmentService.getAllEnrollments();
    }

    // READ BY STUDENT ID
    @GetMapping("/student/{studentId}")
    public List<StudentCourseEnrollment> getByStudentId(@PathVariable int studentId) {
        return enrollmentService.getEnrollmentsByStudentId(studentId);
    }

    // READ BY COURSE ID
    @GetMapping("/course/{courseId}")
    public List<StudentCourseEnrollment> getByCourseId(@PathVariable int courseId) {
        return enrollmentService.getEnrollmentsByCourseId(courseId);
    }

    // DELETE
    @DeleteMapping("/delete/{studentId}/{courseId}")
    public String deleteEnrollment(@PathVariable int studentId, @PathVariable int courseId) {
        return enrollmentService.deleteEnrollment(studentId, courseId);
    }
}
