package com.g1appdev.Moodel.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.student.Student;
import com.g1appdev.Moodel.respository.student.StudentRepo;
import com.g1appdev.Moodel.security.entities.StudentDetails;

@Service
public class StudentDetailsService implements UserDetailsService {

    @Autowired
    StudentRepo srepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Student student = srepo.findByEmail(username).get();

        if(student == null) {
            throw new UsernameNotFoundException("🔴 ERROR: Student record with email " + username + " was NOT found.");
        }

        return new StudentDetails(student);
    }
    
}
