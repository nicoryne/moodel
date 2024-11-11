package com.g1appdev.Moodel.controller.student;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.g1appdev.Moodel.entity.student.Student;
import com.g1appdev.Moodel.security.entities.AuthRequest;
import com.g1appdev.Moodel.service.student.StudentService;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentService sserv;

    //#################
    // UTILITY FUNCTIONS
    //#################

    @GetMapping("/test")
    public ResponseEntity<String> print() {
        return ResponseEntity.status(HttpStatus.OK).body("✅ SUCCESS: Student API connected successfully!");
    }

    //#################
    // CREATE FUNCTIONS
    //#################

    @PostMapping("/create")
    public ResponseEntity<Student> create(@RequestBody Student student) {
        Student newStudent = sserv.postStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(newStudent);
    }

    //#################
    // READ FUNCTIONS
    //#################

    @GetMapping("/getAll")
    public ResponseEntity<List<Student>> getAll() {
        List<Student> students = sserv.getAllStudents();
        return ResponseEntity.status(HttpStatus.OK).body(students);
    }

    @GetMapping("/getByEmail")
    public ResponseEntity<Optional<Student>> getByEmail(@RequestParam String email) {
        Optional<Student> student = sserv.getStudentByEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(student);
    }

    //#################
    // UPDATE FUNCTIONS
    //#################

    @PutMapping("/update")
    public ResponseEntity<Student> update(@RequestParam int id, @RequestBody Student newStudentDetails) {
        Student updatedStudent = sserv.putStudent(id, newStudentDetails);
        return ResponseEntity.status(HttpStatus.OK).body(updatedStudent);
    }

    //#################
    // DELETE FUNCTIONS
    //#################

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam int id) {
        String result = sserv.deleteStudent(id);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    //#################
    // AUTH FUNCTIONS
    //#################

    @PostMapping("/register")
    public ResponseEntity<Student> register(@RequestBody Student student) {
        Student newStudent = sserv.postStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(newStudent);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest authRequest) {
        String username = authRequest.getUsername();
        String password = authRequest.getPassword();

        if (username == null || password == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("🔴 ERROR: Missing username or password");
        }

        boolean isAuthenticated = sserv.authenticateStudent(username, password);
        if (!isAuthenticated) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("🔴 ERROR: Invalid credentials");
        }

        String token = sserv.generateTokenForStudent(username);
        return ResponseEntity.ok(token);
    }
}
