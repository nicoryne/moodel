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
import com.g1appdev.Moodel.service.utils.FileStorageService;

@Service
public class TeacherService {
    
    @Autowired
    TeacherRepo trepo;
    
    @Autowired
    FileStorageService fileStorageService;

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
        // Fetch the teacher record by ID
        Teacher teacher = trepo.findById(id)
            .orElseThrow(() -> new NoSuchElementException("🔴 ERROR: Teacher record with ID " + id + " was NOT found."));
    
        // Update only the fields that are not null or empty
        if (newTeacherDetails.getFname() != null && !newTeacherDetails.getFname().isEmpty()) {
            teacher.setFname(newTeacherDetails.getFname());
        }
        if (newTeacherDetails.getLname() != null && !newTeacherDetails.getLname().isEmpty()) {
            teacher.setLname(newTeacherDetails.getLname());
        }
        if (newTeacherDetails.getBirthDate() != null) {
            teacher.setBirthDate(newTeacherDetails.getBirthDate());
        }        
        if (newTeacherDetails.getPassword() != null && !newTeacherDetails.getPassword().isEmpty()) {
            teacher.setPassword(bCryptPasswordEncoder.encode(newTeacherDetails.getPassword()));
        }
        if (newTeacherDetails.getEmail() != null && !newTeacherDetails.getEmail().isEmpty()) {
            teacher.setEmail(newTeacherDetails.getEmail());
        }
        if (newTeacherDetails.getPhoneNumber() != null) {
            teacher.setPhoneNumber(newTeacherDetails.getPhoneNumber());
        }
        if (newTeacherDetails.getAddress() != null) {
            teacher.setAddress(newTeacherDetails.getAddress());
        }

        if (newTeacherDetails.getProfilePicture() != null) {
            // Teacher already has a profile picture, delete
            // old profile picture to save space
            if(teacher.getProfilePicture() != null && !teacher.getProfilePicture().isEmpty()) {
                String fileName = teacher.getProfilePicture();
                fileStorageService.deleteFile(fileName);
            }

            // Set new profile picture
            teacher.setProfilePicture(newTeacherDetails.getProfilePicture());
        }
        
        teacher.setAge(newTeacherDetails.getAge());

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
