package com.g1appdev.Moodel.security.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class CombinedUserDetailsService implements UserDetailsService {

    private TeacherDetailsService tdserv;

    private StudentDetailsService sderv;

    private AdminDetailsService adserv;

    public CombinedUserDetailsService(TeacherDetailsService teacherDetailsService, StudentDetailsService studentDetailsService, AdminDetailsService adminDetailsService) {
        this.tdserv = teacherDetailsService;
        this.sderv = studentDetailsService;
        this.adserv = adminDetailsService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        String role = PrefixHandler.determineRole(username);

        switch(role) {
            case "Teacher":
                return tdserv.loadUserByUsername(PrefixHandler.removePrefix(username));
            case "Student":
                return sderv.loadUserByUsername(PrefixHandler.removePrefix(username));
            case "Admin":
                return adserv.loadUserByUsername(PrefixHandler.removePrefix(username));
            default:
                throw new UsernameNotFoundException("🔴 ERROR: Unknown user prefix type.");
        }        
    }
    
}
