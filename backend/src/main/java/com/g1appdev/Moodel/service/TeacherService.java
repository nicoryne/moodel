package com.g1appdev.Moodel.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.Teacher;
import com.g1appdev.Moodel.respository.CourseRepo;
import com.g1appdev.Moodel.respository.TeacherRepo;

@Service
public class TeacherService {
    
    @Autowired
    TeacherRepo trepo;

    @Autowired
    CourseRepo crepo;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

  
    public TeacherService(TeacherRepo trepo, CourseRepo crepo, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.trepo = trepo;
        this.crepo = crepo;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    // CREATE
    public Teacher postTeacherRecord(Teacher teacher) {
        if(trepo.findByEmail(teacher.getEmail()) != null) {
            throw new RuntimeException ("🔴 ERROR: Teacher record with email " + teacher.getEmail() + " already exists.");
        }

        // Encrpyt password when user is added
        teacher.setPassword(bCryptPasswordEncoder.encode(teacher.getPassword()));
        return trepo.save(teacher);
    }

    // READ
    public List<Teacher> getAllTeachers() {
        return trepo.findAll();
    }

    public Teacher getTeacherByEmail(String email) {
        return trepo.findByEmail(email);
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
            throw new NoSuchElementException("🔴 ERROR: Teacher record with ID " + id + " was NOT found.");
        } finally {
            return trepo.save(teacher);
        }
    }
    

    // DELETE
    public String deleteTeacher(int id) {
        if(!trepo.existsById(id)) {
            throw new NoSuchElementException("🔴 ERROR: Teacher record with ID " + id + " was NOT found.");  
        }

        trepo.deleteById(id);
        return "✅ SUCCESS: Teacher record with ID " + id + " has been successfully deleted.";  
    }
}
