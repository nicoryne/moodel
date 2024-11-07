package com.g1appdev.Moodel.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CombinedUserDetailsService implements UserDetailsService {

    private TeacherDetailsService teacherDetailsService;

    // private StudentDetailsService studentDetailsService;

    public CombinedUserDetailsService(TeacherDetailsService teacherDetailsService) {
        this.teacherDetailsService = teacherDetailsService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        if (username.startsWith(".nC1G`89;y.")) {
            return teacherDetailsService.loadUserByUsername(username.substring(".nC1G`89;y.".length()));
        } 

        throw new UsernameNotFoundException("🔴 ERROR: Unknown user prefix type.");
    }
    
}
