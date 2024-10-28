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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.g1appdev.Moodel.entity.Teacher;
import com.g1appdev.Moodel.service.TeacherService;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(method = RequestMethod.GET,path="/api/teacher")
public class TeacherController {
    
    @Autowired
    TeacherService tserv;

    @GetMapping("/testConnection")
    public String print() {
        return "✅ SUCCESS: Teacher API connected sucessfully!";
    }

    // CREATE
    @PostMapping("/postTeacherRecord")
    public Teacher postTeacherRecord(@RequestBody Teacher teacher) {
        return tserv.postTeacherRecord(teacher);
    }

    // READ
    @GetMapping("/getAllTeachers")
    public List<Teacher> getAllTeachers() {
        return tserv.getAllTeachers();
    }

    @GetMapping("/getTeacherByEmail")
    public Teacher getTeacherByEmail(@RequestParam String email) {
        return tserv.getTeacherByEmail(email);
    }

    // UPDATE
    @PutMapping("/putTeacherDetails")
    public Teacher putTeacherDetails (@RequestParam int id, @RequestBody Teacher newTeacher) {
        return tserv.putTeacherDetails(id, newTeacher);
    }


    // DELETE
    @DeleteMapping("/deleteTeacherDetails/{id}")
    public String deleteTeacher(@PathVariable int id) {
        return tserv.deleteTeacher(id);
    }
    
}
