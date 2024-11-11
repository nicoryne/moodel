package com.g1appdev.Moodel.controller.course;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.g1appdev.Moodel.entity.course.Course;
import com.g1appdev.Moodel.service.course.CourseService;

@RestController
@RequestMapping("/api/course")
public class CourseController {

    @Autowired
    private CourseService cserv;

    //#################
    // UTILITY FUNCTIONS
    //#################

    @GetMapping("/test")
    public ResponseEntity<String> print() {
        return ResponseEntity.status(HttpStatus.OK).body("✅ SUCCESS: Course API connected successfully!");
    }

    //#################
    // CREATE FUNCTIONS
    //#################

    @PostMapping("/create")
    public ResponseEntity<Course> create(@RequestBody Course course) {
        Course newCourse = cserv.postCourseRecord(course);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCourse);
    }

    //#################
    // READ FUNCTIONS
    //#################

    @GetMapping("/getAll")
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = cserv.getAllCourses();
        return ResponseEntity.status(HttpStatus.OK).body(courses);
    }

    @GetMapping("/getById")
    public ResponseEntity<Course> getCourseById(@RequestParam int id) {
        Course course = cserv.getCourseById(id);
        return ResponseEntity.status(HttpStatus.OK).body(course);
    }

    @GetMapping("/getByTitle")
    public ResponseEntity<Course> getCourseByTitle(@RequestParam String title) {
        Course course = cserv.getCourseByTitle(title);
        return ResponseEntity.status(HttpStatus.OK).body(course);
    }

    //#################
    // UPDATE FUNCTIONS
    //#################

    @PutMapping("/update")
    public ResponseEntity<Course> update(@RequestParam int id, @RequestBody Course newCourseDetails) {
        Course updatedCourse = cserv.updateCourseDetails(id, newCourseDetails);
        return ResponseEntity.status(HttpStatus.OK).body(updatedCourse);
    }

    //#################
    // DELETE FUNCTIONS
    //#################

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam int id) {
        String result = cserv.deleteCourse(id);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
