package com.g1appdev.Moodel.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.Course;
import com.g1appdev.Moodel.entity.Teacher;
import com.g1appdev.Moodel.respository.CourseRepo;
import com.g1appdev.Moodel.respository.TeacherRepo;

@Service
public class TeacherService {
    
    @Autowired
    TeacherRepo trepo;

    @Autowired
    CourseRepo crepo;

    public TeacherService() {
        super();
    }


    // CREATE
    public Teacher postTeacherRecord(Teacher teacher) {
        return trepo.save(teacher);
    }

    // READ
    public List<Teacher> getAllTeachers() {
        return trepo.findAll();
    }

    // UPDATE
    @SuppressWarnings("finally")
    public Teacher putTeacherDetails(int id, Teacher newTeacherDetails) {
        Teacher teacher = new Teacher();
        try {
            teacher = trepo.findById(id).get();

            teacher.setFname(newTeacherDetails.getFname());
            teacher.setLname(newTeacherDetails.getLname());
            teacher.setBirthDate(newTeacherDetails.getBirthDate());
            teacher.setAge(newTeacherDetails.getAge());
            teacher.setPassword(newTeacherDetails.getPassword());
            teacher.setEmail(newTeacherDetails.getEmail());
            teacher.setPhoneNumber(newTeacherDetails.getPhoneNumber());
            teacher.setHireDate(newTeacherDetails.getHireDate());
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException("Teacher " + id + " not found");
        } finally {
            return trepo.save(teacher);
        }
    }

    public Teacher addCourse(int teacherId, int courseId) {
        Teacher teacher = trepo.findById(teacherId)
            .orElseThrow(() -> new NoSuchElementException("Teacher not found"));
        Course course = crepo.findById(courseId)
            .orElseThrow(() -> new NoSuchElementException("Course not found"));
        
        teacher.getCourses().add(course);

        trepo.save(teacher);
    
        return  teacher;
    }
    

    // DELETE
    public String deleteTeacher(int id) {
        if(trepo.findById(id) == null) {
            return "Teacher record with ID " + id + " was NOT found."; 
        }

        trepo.deleteById(id);
        return "Teacher record with ID " + id + " has been successfully deleted.";  
    }
}
