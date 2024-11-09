package com.g1appdev.Moodel.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


/*
 *  TODO: Added student side
 */
@Service
public class CombinedUserDetailsService implements UserDetailsService {

    private TeacherDetailsService teacherDetailsService;

    
    


    public CombinedUserDetailsService(TeacherDetailsService teacherDetailsService) {
        this.teacherDetailsService = teacherDetailsService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Checks if username prefixes matches with teacher secret
        // If yes, then load username from teacher details
        if (username.startsWith(RolePrefixes.PREFIX_TEACHER_SECRET)) {
            return teacherDetailsService.loadUserByUsername(RolePrefixes.removePrefix(username));
        } 

        // If username doesn't match with any of the prefix provided
        // then return UsernameNotFoundException
        throw new UsernameNotFoundException("🔴 ERROR: Unknown user prefix type.");
    }
    
}
