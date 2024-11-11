package com.g1appdev.Moodel.service.teacher;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.teacher.Teacher;
import com.g1appdev.Moodel.respository.teacher.TeacherRepo;
import com.g1appdev.Moodel.security.services.JWTService;

@Service
public class TeacherService {
    
    @Autowired
    TeacherRepo trepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    //#################
    // CREATE FUNCTIONS
    //#################

    public Teacher postTeacher(Teacher teacher) {
        Optional<Teacher> existingTeacher = trepo.findByEmail(teacher.getEmail());
        
        if (existingTeacher.isPresent()) {
            throw new RuntimeException("🔴 ERROR: Teacher record with email " + teacher.getEmail() + " already exists.");
        }
    
        // Encrypt password when user is added
        teacher.setPassword(bCryptPasswordEncoder.encode(teacher.getPassword()));
        return trepo.save(teacher);
    }
    


    //#################
    // READ FUNCTIONS
    //#################

    public List<Teacher> getAllTeachers() {
        return trepo.findAll();
    }

    public Optional<Teacher> getTeacherByEmail(String email) {
        return trepo.findByEmail(email);
    }

    public Optional<Teacher> getTeacherById(int id) {
        return trepo.findById(id);
    }


    //#################
    // UPDATE FUNCTIONS
    //#################

    public Teacher putTeacher(int id, Teacher newTeacherDetails) {
        Teacher teacher = trepo.findById(id)
            .orElseThrow(() -> new NoSuchElementException("🔴 ERROR: Teacher record with ID " + id + " was NOT found."));

        teacher.setFname(newTeacherDetails.getFname());
        teacher.setLname(newTeacherDetails.getLname());
        teacher.setBirthDate(newTeacherDetails.getBirthDate());
        teacher.setAge(newTeacherDetails.getAge());
        teacher.setPassword(newTeacherDetails.getPassword());
        teacher.setEmail(newTeacherDetails.getEmail());
        teacher.setPhoneNumber(newTeacherDetails.getPhoneNumber());
       
        return trepo.save(teacher);
    }
    

    //#################
    // DELETE FUNCTIONS
    //#################

    public String deleteTeacher(int id) {
        if(!trepo.existsById(id)) {
            throw new NoSuchElementException("🔴 ERROR: Teacher record with ID " + id + " was NOT found.");  
        }

        trepo.deleteById(id);
        return "✅ SUCCESS: Teacher record with ID " + id + " has been successfully deleted.";  
    }


    //#################
    // AUTH FUNCTIONS
    //#################

    public boolean authenticateTeacher(String username, String password) {
        Authentication authentication =
         authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                username, 
                password
            )
        );

        return authentication.isAuthenticated();
    }

    public String generateTokenForTeacher(String username) {
        return jwtService.generateToken(username);
    }

}
