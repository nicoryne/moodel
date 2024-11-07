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

    /**
     *   Randomly generated prefix to check if incoming username belongs to a teacher.
     * 
     *   This generated prefix is provided through the frontend.
     * 
     *   Intentionally added symbols such as the '.' in the beginning to prevent mistaking
     *   for an actual email address.
     * */
    private static final String PREFIX_TEACHER_SECRET = ".nC1G`89;y.";


    public CombinedUserDetailsService(TeacherDetailsService teacherDetailsService) {
        this.teacherDetailsService = teacherDetailsService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Checks if username prefixes matches with teacher secret
        // If yes, then load username from teacher details
        if (username.startsWith(PREFIX_TEACHER_SECRET)) {
            return teacherDetailsService.loadUserByUsername(username.substring(PREFIX_TEACHER_SECRET.length()));
        } 

        // If username doesn't match with any of the prefix provided
        // then return UsernameNotFoundException
        throw new UsernameNotFoundException("🔴 ERROR: Unknown user prefix type.");
    }
    
}
