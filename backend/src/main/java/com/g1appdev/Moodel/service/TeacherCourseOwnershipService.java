package com.g1appdev.Moodel.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.Course;
import com.g1appdev.Moodel.entity.Teacher;
import com.g1appdev.Moodel.entity.TeacherCourseOwnership;
import com.g1appdev.Moodel.respository.CourseRepo;
import com.g1appdev.Moodel.respository.TeacherCourseOwnershipRepo;
import com.g1appdev.Moodel.respository.TeacherRepo;

import jakarta.persistence.EntityNotFoundException;
@Service
public class TeacherCourseOwnershipService {

    @Autowired
    private TeacherCourseOwnershipRepo tcorepo;

    @Autowired
    private TeacherRepo trepo;

    @Autowired CourseRepo crepo;

    public TeacherCourseOwnershipService() {
        super();
    }

    // CREATE
    public TeacherCourseOwnership postTeacherCourseOwnershipRecord(TeacherCourseOwnership teacherCourseOwnership) {
        int teacherId = teacherCourseOwnership.getTeacherCourseId().getTeacherId();
        int courseId = teacherCourseOwnership.getTeacherCourseId().getCourseId();

        Teacher teacher = trepo.findById(teacherId)
            .orElseThrow(() -> new EntityNotFoundException("🔴 ERROR: Teacher record with ID " + teacherId + " was NOT found."));

        Course course = crepo.findById(courseId)
            .orElseThrow(() -> new EntityNotFoundException("🔴 ERROR: Course record with ID " + courseId + " was NOT found."));
            
        teacherCourseOwnership.setTeacher(teacher);
        teacherCourseOwnership.setCourse(course);
        return tcorepo.save(teacherCourseOwnership);
    }

    // READ
    public List<TeacherCourseOwnership> getAllTeacherCourseOwnerships() {
        return tcorepo.findAll();
    }

    // UPDATE
    @SuppressWarnings("finally")
    public TeacherCourseOwnership putTeacherCourseOwnership(int id, TeacherCourseOwnership newTeacherCourseOwnership) {
        TeacherCourseOwnership teacherCourseOwnership = new TeacherCourseOwnership();
        try {
            teacherCourseOwnership = tcorepo.findById(id).get();

            teacherCourseOwnership.setCourse(newTeacherCourseOwnership.getCourse());
            teacherCourseOwnership.setTeacher(newTeacherCourseOwnership.getTeacher());
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException("🔴 ERROR: TeacherCourseOwnership record with ID " + id + " was NOT found.");
        } finally {
            return tcorepo.save(teacherCourseOwnership);
        }
    }

    // DELETE
    public String deleteTeacherCourseOwnership(int id) {
        if(tcorepo.findById(id) == null) {
            return "🔴 ERROR: TeacherCourseOwnership record with ID " + id + " was NOT found."; 
        }
        
        tcorepo.deleteById(id);
        return "✅ SUCCESS: TeacherCourseOwnership record with ID " + id + " has been successfully deleted.";
    }
    
}
