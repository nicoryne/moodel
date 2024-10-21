package com.g1appdev.Moodel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping(method = RequestMethod.GET,path="/api/teacher")
public class TeacherController {
    
    @Autowired
    TeacherService tserv;

    @GetMapping("/008")
    public String print() {
        return "CONNECTION IS GOOD!";
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

    // UPDATE
    @PutMapping("/putTeacherDetails")
    public Teacher putTeacherDetails (@RequestParam int id, @RequestBody Teacher newTeacher) {
        return tserv.putTeacherDetails(id, newTeacher);
    }

    @PutMapping("/putCourseToTeacher")
    public Teacher putMethodName(@RequestParam int teacherId, @RequestParam int courseId) {
        return tserv.addCourse(teacherId, courseId);
    }
    

    // DELETE
    @DeleteMapping("/deleteTeacherDetails/{id}")
    public String deleteTeacher(@PathVariable int id) {
        return tserv.deleteTeacher(id);
    }
}
