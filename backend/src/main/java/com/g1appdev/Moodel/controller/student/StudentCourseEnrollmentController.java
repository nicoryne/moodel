package com.g1appdev.Moodel.controller.student;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.g1appdev.Moodel.entity.student.StudentCourseEnrollment;
import com.g1appdev.Moodel.entity.student.StudentCourseEnrollmentKey;
import com.g1appdev.Moodel.entity.teacher.TeacherCourseOwnership;
import com.g1appdev.Moodel.service.student.StudentCourseEnrollmentService;

@RestController
@RequestMapping("/api/studentCourseEnrollment")
public class StudentCourseEnrollmentController {

    @Autowired
    private StudentCourseEnrollmentService eserv;

    //#################
    // UTILITY FUNCTIONS
    //#################

    
    @GetMapping("/test")
    public ResponseEntity<String> print() {
        return ResponseEntity.status(HttpStatus.OK).body("✅ SUCCESS: StudentCourseEnrollment API connected successfully!");
    }

    //#################
    // CREATE FUNCTIONS
    //#################

    @PostMapping("/create")
    public ResponseEntity<StudentCourseEnrollment> create(@RequestBody StudentCourseEnrollment enrollment) {
        StudentCourseEnrollment newEnrollment = eserv.postStudentCourseEnrollment(enrollment);
        return ResponseEntity.status(HttpStatus.CREATED).body(newEnrollment);
    }

    //#################
    // READ FUNCTIONS
    //#################

    @GetMapping("/getAll")
    public ResponseEntity<List<StudentCourseEnrollment>> getAll() {
        List<StudentCourseEnrollment> enrollments = eserv.getAllEnrollments();
        return ResponseEntity.status(HttpStatus.OK).body(enrollments);
    }

    @GetMapping("/getByStudentId")
    public ResponseEntity<List<StudentCourseEnrollment>> getByStudentId(@RequestParam int studentId) {
        List<StudentCourseEnrollment> enrollments = eserv.getEnrollmentsByStudentId(studentId);
        return ResponseEntity.status(HttpStatus.OK).body(enrollments);
    }

    @GetMapping("/getByCourseId")
    public ResponseEntity<List<StudentCourseEnrollment>> getByCourseId(@RequestParam int courseId) {
        List<StudentCourseEnrollment> enrollments = eserv.getEnrollmentsByCourseId(courseId);
        return ResponseEntity.status(HttpStatus.OK).body(enrollments);
    }

    //#################
    // UPDATE FUNCTIONS
    //#################
    @PutMapping("/update")
    public ResponseEntity<StudentCourseEnrollment> update(@RequestBody StudentCourseEnrollment newStudentCourseEnrollment) {
        StudentCourseEnrollment updatedEnrollment = eserv.putStudentCourseEnrollment(newStudentCourseEnrollment);
        return ResponseEntity.status(HttpStatus.OK).body(updatedEnrollment);
    }

    //#################
    // DELETE FUNCTIONS
    //#################

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody StudentCourseEnrollmentKey key) {
        String result = eserv.deleteStudentCourseEnrollment(key);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
