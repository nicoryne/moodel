package com.g1appdev.Moodel.service.student;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.student.Student;
import com.g1appdev.Moodel.respository.student.StudentRepo;
import com.g1appdev.Moodel.security.services.JWTService;

@Service
public class StudentService {
    
    @Autowired
    StudentRepo srepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    //#################
    // CREATE FUNCTIONS
    //#################

    public Student postStudent(Student student) {
        Optional<Student> existingStudent = srepo.findByEmail(student.getEmail());
        
        if (existingStudent.isPresent()) {
            throw new RuntimeException("🔴 ERROR: Student record with email " + student.getEmail() + " already exists.");
        }
    
        // Encrypt password when user is added
        student.setPassword(bCryptPasswordEncoder.encode(student.getPassword()));
        return srepo.save(student);
    }
    


    //#################
    // READ FUNCTIONS
    //#################

    public List<Student> getAllStudents() {
        return srepo.findAll();
    }

    public Optional<Student> getStudentByEmail(String email) {
        return srepo.findByEmail(email);
    }

    public Optional<Student> getStudentById(int id) {
        return srepo.findById(id);
    }


    //#################
    // UPDATE FUNCTIONS
    //#################

    public Student putStudent(int id, Student newStudentDetails) {
        Student student = srepo.findById(id)
            .orElseThrow(() -> new NoSuchElementException("🔴 ERROR: Student record with ID " + id + " was NOT found."));
    
        if (newStudentDetails.getFname() != null && !newStudentDetails.getFname().isEmpty()) {
            student.setFname(newStudentDetails.getFname());
        }
        if (newStudentDetails.getLname() != null && !newStudentDetails.getLname().isEmpty()) {
            student.setLname(newStudentDetails.getLname());
        }
        if (newStudentDetails.getBirthDate() != null) {
            student.setBirthDate(newStudentDetails.getBirthDate());
        }
        if (newStudentDetails.getPassword() != null && !newStudentDetails.getPassword().isEmpty()) {
            student.setPassword(newStudentDetails.getPassword());
        }
        if (newStudentDetails.getEmail() != null) {
            student.setEmail(newStudentDetails.getEmail());
        }
        if (newStudentDetails.getPhoneNumber() != null) {
            student.setPhoneNumber(newStudentDetails.getPhoneNumber());
        }
        if (newStudentDetails.getAddress() != null) {
            student.setAddress(newStudentDetails.getAddress());
        }

        student.setAge(newStudentDetails.getAge());
    
        return srepo.save(student);
    }
    

    //#################
    // DELETE FUNCTIONS
    //#################

    public String deleteStudent(int id) {
        if(!srepo.existsById(id)) {
            throw new NoSuchElementException("🔴 ERROR: Student record with ID " + id + " was NOT found.");  
        }

        srepo.deleteById(id);
        return "✅ SUCCESS: Student record with ID " + id + " has been successfully deleted.";  
    }


    //#################
    // AUTH FUNCTIONS
    //#################

    public boolean authenticateStudent(String username, String password) {
        Authentication authentication =
         authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                username, 
                password
            )
        );

        return authentication.isAuthenticated();
    }

    public String generateTokenForStudent(String username) {
        return jwtService.generateToken(username);
    }

}
