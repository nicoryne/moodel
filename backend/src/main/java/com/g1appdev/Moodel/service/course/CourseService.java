package com.g1appdev.Moodel.service.course;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.course.Course;
import com.g1appdev.Moodel.respository.course.CourseRepo;

@Service
public class CourseService {

    @Autowired
    CourseRepo crepo;

    //#################
    // CREATE FUNCTIONS
    //#################

    public Course postCourseRecord(Course course) {
        return crepo.save(course);
    }

    //#################
    // READ FUNCTIONS
    //#################

    public List<Course> getAllCourses() {
        return crepo.findAll();
    }

    public Course getCourseById(int id) {
        return crepo.findById(id)
            .orElseThrow(() -> new NoSuchElementException("🔴 ERROR: Course record with ID " + id + " was NOT found."));
    }

    public Course getCourseByTitle(String title) {
        return crepo.findByTitle(title);
    }

    //#################
    // UPDATE FUNCTIONS
    //#################

    public Course updateCourseDetails(int id, Course newCourseDetails) {
        Course course = crepo.findById(id)
            .orElseThrow(() -> new NoSuchElementException("🔴 ERROR: Course record with ID " + id + " was NOT found."));

        course.setTitle(newCourseDetails.getTitle());
        course.setDescription(newCourseDetails.getDescription());
        course.setCreatedAt(newCourseDetails.getCreatedAt());

        return crepo.save(course);
    }

    //#################
    // DELETE FUNCTIONS
    //#################

    public String deleteCourse(int id) {
        if (!crepo.existsById(id)) {
            return "🔴 ERROR: Course record with ID " + id + " was NOT found.";
        }

        crepo.deleteById(id);
        return "✅ SUCCESS: Course record with ID " + id + " has been successfully deleted.";
    }
}
