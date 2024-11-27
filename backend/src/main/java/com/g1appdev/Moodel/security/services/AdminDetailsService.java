package com.g1appdev.Moodel.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.admin.Admin;
import com.g1appdev.Moodel.respository.admin.AdminRepo;
import com.g1appdev.Moodel.security.entities.AdminDetails;

@Service
public class AdminDetailsService implements UserDetailsService {

    @Autowired
    AdminRepo arepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin admin = arepo.findByEmail(username).get();

        if(admin == null) {
            throw new UsernameNotFoundException("🔴 ERROR: Admin record with email " + username + " was NOT found.");
        }

        return new AdminDetails(admin);
    }
    
}
