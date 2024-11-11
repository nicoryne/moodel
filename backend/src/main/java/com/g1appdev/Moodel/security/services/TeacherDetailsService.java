package com.g1appdev.Moodel.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.teacher.Teacher;
import com.g1appdev.Moodel.respository.teacher.TeacherRepo;
import com.g1appdev.Moodel.security.entities.TeacherDetails;

@Service
public class TeacherDetailsService implements UserDetailsService {

    @Autowired
    TeacherRepo trepo;


    @Override
    public TeacherDetails loadUserByUsername(String username) {
        Teacher teacher = trepo.findByEmail(username).get();

        if(teacher == null) {
            throw new UsernameNotFoundException("🔴 ERROR: Teacher record with email " + username + " was NOT found.");
        }

        return new TeacherDetails(teacher);
    }
    
}
