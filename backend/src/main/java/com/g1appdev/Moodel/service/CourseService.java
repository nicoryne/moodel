package com.g1appdev.Moodel.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.Course;
import com.g1appdev.Moodel.respository.CourseRepo;

@Service
public class CourseService {

    @Autowired
    CourseRepo crepo;

    public CourseService() {
        super();
    }

    // CREATE
    public Course postCourseRecord(Course course) {
        return crepo.save(course);
    }

    // READ
    public List<Course> getAllCourses() {
        return crepo.findAll();
    }

    // UPDATE
    @SuppressWarnings("finally")
    public Course putCourseDetails(int id, Course newCourseDetails) {
        Course course = new Course();
        try {
            course = crepo.findById(id).get();

            course.setTitle(newCourseDetails.getTitle());
            course.setDescription(newCourseDetails.getDescription());
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException("🔴 ERROR: Course record with ID " + id + " was NOT found.");
        } finally {
            return crepo.save(course);
        }
    }

    // DELETE
    public String deleteCourse(int id) {
        if(crepo.findById(id).get() == null) {
            return "🔴 ERROR: Course record with ID " + id + " was NOT found."; 
        }

        crepo.deleteById(id);
        return "✅ SUCCESS: Course record with ID " + id + " has been successfully deleted.";
    }

}
