package com.g1appdev.Moodel.controller.teacher;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.g1appdev.Moodel.entity.teacher.Teacher;
import com.g1appdev.Moodel.security.entities.AuthRequest;
import com.g1appdev.Moodel.service.teacher.TeacherService;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    @Autowired
    TeacherService tserv;

    //#################
    // UTILITY FUNCTIONS
    //#################

    @GetMapping("/test")
    public ResponseEntity<String> print() {
        return ResponseEntity.status(HttpStatus.OK).body("✅ SUCCESS: Teacher API connected successfully!");
    }

    //#################
    // CREATE FUNCTIONS
    //#################

    @PostMapping("/create")
    public ResponseEntity<Teacher> createTeacher(@RequestBody Teacher teacher) {
        Teacher newTeacher = tserv.postTeacher(teacher);
        return ResponseEntity.status(HttpStatus.CREATED).body(newTeacher);
    }

    //#################
    // READ FUNCTIONS
    //#################

    @GetMapping("/getAll")
    public ResponseEntity<List<Teacher>> getAllTeachers() {
        List<Teacher> teachers = tserv.getAllTeachers();
        return ResponseEntity.status(HttpStatus.OK).body(teachers);
    }

    @GetMapping("/getByEmail")
    public ResponseEntity<Optional<Teacher>> getTeacherByEmail(@RequestParam String email) {
        Optional<Teacher> teacher = tserv.getTeacherByEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(teacher);
    }

    //#################
    // UPDATE FUNCTIONS
    //#################

    @PutMapping("/update")
    public ResponseEntity<Teacher> updateTeacher(@RequestBody Teacher newTeacher) {
        Teacher updatedTeacher = tserv.putTeacher(newTeacher.getTeacherId(), newTeacher);
        return ResponseEntity.status(HttpStatus.OK).body(updatedTeacher);
    }

    //#################
    // DELETE FUNCTIONS
    //#################

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteTeacher(@RequestParam int id) {
        String result = tserv.deleteTeacher(id);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    //#################
    // AUTH FUNCTIONS
    //#################

    @PostMapping("/register")
    public ResponseEntity<Teacher> registerTeacher(@RequestBody Teacher teacher) {
        Teacher newTeacher = tserv.postTeacher(teacher);
        return ResponseEntity.status(HttpStatus.CREATED).body(newTeacher);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest authRequest) {
        String username = authRequest.getUsername();
        String password = authRequest.getPassword();

        if (username == null || password == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("🔴 ERROR: Missing username or password");
        }

        boolean isAuthenticated = tserv.authenticateTeacher(username, password);
        if (!isAuthenticated) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("🔴 ERROR: Invalid credentials");
        }

        String token = tserv.generateTokenForTeacher(username);
        return ResponseEntity.ok(token);
    }
}
