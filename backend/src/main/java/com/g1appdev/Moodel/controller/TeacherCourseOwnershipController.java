package com.g1appdev.Moodel.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.g1appdev.Moodel.entity.TeacherCourseOwnership;
import com.g1appdev.Moodel.service.TeacherCourseOwnershipService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(method = RequestMethod.GET,path="/api/teacherCourseOwnership")
public class TeacherCourseOwnershipController {
    
    @Autowired
    TeacherCourseOwnershipService tcoserv;

    @GetMapping("/testConnection")
    public String print() {
        return "✅ SUCCESS: TeacherCourseOwnership API connected sucessfully!";
    }

    // CREATE
    @PostMapping("/postTeacherCourseOwnership")
    public TeacherCourseOwnership postTeacherCourseOwnershipRecord(@RequestBody TeacherCourseOwnership teacherCourseOwnership) {
        return tcoserv.postTeacherCourseOwnershipRecord(teacherCourseOwnership);
    }

    // READ
    @GetMapping("/getAllTeacherCourseOwnerships")
    public List<TeacherCourseOwnership> getAllTeacherCourseOwnerships() {
        return tcoserv.getAllTeacherCourseOwnerships();
    }

    // UPDATE
    @PutMapping("/putTeacherCourseOwnershipDetails")
    public TeacherCourseOwnership putTeacherCourseOwnershipDetails (@RequestParam int id, @RequestBody TeacherCourseOwnership newTeacherCourseOwnership) {
        return tcoserv.putTeacherCourseOwnership(id, newTeacherCourseOwnership);
    }

    // DELETE
    @DeleteMapping("/deleteTeacherCourseOwnership/{id}")
    public String deleteTeacherCourseOwnership(@PathVariable int id) {
        return tcoserv.deleteTeacherCourseOwnership(id);
    }
}
