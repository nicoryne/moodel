package com.g1appdev.Moodel.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.Teacher;
import com.g1appdev.Moodel.respository.TeacherRepo;

@Service
public class TeacherDetailsService implements UserDetailsService {

    @Autowired
    TeacherRepo trepo;


    @Override
    public TeacherDetails loadUserByUsername(String username) {
        Teacher teacher = trepo.findByEmail(username);

        if(teacher == null) {
            throw new UsernameNotFoundException("🔴 ERROR: Teacher record with email " + username + " was NOT found.");
        }

        return new TeacherDetails(teacher);
    }
    
}
