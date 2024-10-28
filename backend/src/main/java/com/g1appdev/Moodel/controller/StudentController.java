package com.g1appdev.Moodel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;

import com.g1appdev.Moodel.entity.Student;
import com.g1appdev.Moodel.service.StudentService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    StudentService studentService;

    @GetMapping("/testConnection")
    public String testConnection() {
        return "Student API connected successfully!";
    }

    // CREATE
    @PostMapping("/postStudentRecord")
    public Student postStudentRecord(@RequestBody Student student) {
        return studentService.postStudentRecord(student);
    }

    // READ
    @GetMapping("/getAllStudents")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // UPDATE
    @PutMapping("/updateStudentDetails")
    public Student updateStudentDetails(@RequestParam int id, @RequestBody Student newStudentDetails) {
        return studentService.updateStudentDetails(id, newStudentDetails);
    }

    @PutMapping("/enrollInCourse")
    public Student enrollInCourse(@RequestParam int studentId, @RequestParam int courseId) {
        return studentService.enrollInCourse(studentId, courseId);
    }

    // DELETE
    @DeleteMapping("/deleteStudent/{id}")
    public String deleteStudent(@PathVariable int id) {
        return studentService.deleteStudent(id);
    }
}
