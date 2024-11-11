package com.g1appdev.Moodel.service.teacher;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.course.Course;
import com.g1appdev.Moodel.entity.teacher.Teacher;
import com.g1appdev.Moodel.entity.teacher.TeacherCourseOwnership;
import com.g1appdev.Moodel.entity.teacher.TeacherCourseOwnershipKey;
import com.g1appdev.Moodel.respository.course.CourseRepo;
import com.g1appdev.Moodel.respository.teacher.TeacherCourseOwnershipRepo;
import com.g1appdev.Moodel.respository.teacher.TeacherRepo;

import jakarta.persistence.EntityNotFoundException;
@Service
public class TeacherCourseOwnershipService {

    @Autowired
    private TeacherCourseOwnershipRepo tcorepo;

    @Autowired
    private TeacherRepo trepo;

    @Autowired 
    private CourseRepo crepo;

    //#################
    // CREATE FUNCTIONS
    //#################

    public TeacherCourseOwnership postTeacherCourseOwnership(TeacherCourseOwnership teacherCourseOwnership) {
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

    //#################
    // READ FUNCTIONS
    //#################
    
    public List<TeacherCourseOwnership> getAllTeacherCourseOwnerships() {
        return tcorepo.findAll();
    }

    public List<TeacherCourseOwnership> getTeacherCourseOwnershipsByTeacherId(int teacherId) {
        return tcorepo.findByTeacher_TeacherId(teacherId);
    }

    public List<TeacherCourseOwnership> getTeacherCourseOwnershipsByCourseId(int courseId) {
        return tcorepo.findByCourse_CourseId(courseId);
    }

    public List<TeacherCourseOwnership> getTeacherCourseOwnershipsByOwnershipDate(Date createdAt) {
        return tcorepo.findByCreatedAt(createdAt);
    }

    //#################
    // UPDATE FUNCTIONS
    //#################

    public TeacherCourseOwnership putTeacherCourseOwnership(TeacherCourseOwnership newTeacherCourseOwnership) {
        TeacherCourseOwnership teacherCourseOwnership = tcorepo.findById(newTeacherCourseOwnership.getTeacherCourseId())
            .orElseThrow(() -> new NoSuchElementException("🔴 ERROR: TeacherCourseOwnership record with ID " + newTeacherCourseOwnership.getTeacherCourseId() + " was NOT found."));
        
        teacherCourseOwnership.setCreatedAt(newTeacherCourseOwnership.getCreatedAt());

        return tcorepo.save(teacherCourseOwnership);
    }

    //#################
    // DELETE FUNCTIONS
    //#################

    public String deleteTeacherCourseOwnership(TeacherCourseOwnershipKey key) {
        if(!tcorepo.existsById(key)) {
            throw new NoSuchElementException("🔴 ERROR: TeacherCourseOwnership record with ID " + key + " was NOT found.");
        }
        
        tcorepo.deleteById(key);
        return "✅ SUCCESS: TeacherCourseOwnership record with ID " + key + " has been successfully deleted.";
    }
    
}
