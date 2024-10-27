package com.g1appdev.Moodel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.g1appdev.Moodel.entity.Course;
import com.g1appdev.Moodel.service.CourseService;

@RestController
@RequestMapping(method = RequestMethod.GET,path="/api/course")
public class CourseController {

    @Autowired
    CourseService cserv;

    @GetMapping("/testConnection")
    public String print() {
        return "✅ SUCCESS: Course API connected sucessfully!";
    }

    // CREATE
    @PostMapping("/postCourseRecord") 
    public Course postCourseRecord(@RequestBody Course course) {
        return cserv.postCourseRecord(course);
    }

    // READ
    @GetMapping("/getAllCourses") 
    public List<Course> getAllCourses() {
         return cserv.getAllCourses();
    }
    

    // UPDATE
    @PutMapping("/putCourseDetails")
    public Course putCourseDetails (@RequestParam int id, @RequestBody Course newCourse) {
        return cserv.putCourseDetails(id, newCourse);
    }

    // DELETE
    @DeleteMapping("/deleteCourseDetails/{id}")
    public String deleteCourse(@PathVariable int id) {
        return cserv.deleteCourse(id);
    }    
    
}
