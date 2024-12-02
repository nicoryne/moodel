package com.g1appdev.Moodel.service.admin;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.admin.Admin;
import com.g1appdev.Moodel.respository.admin.AdminRepo;
import com.g1appdev.Moodel.security.services.JWTService;

@Service
public class AdminService {

    @Autowired
    private AdminRepo arepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    //#################
    // CREATE FUNCTIONS
    //#################

    public Admin postAdminRecord(Admin admin) {
        Optional<Admin> existingAdmin = arepo.findByEmail(admin.getEmail());

        if (existingAdmin.isPresent()) {
            throw new RuntimeException("🔴 ERROR: Admin record with email " + admin.getEmail() + " already exists.");
        }
        
        // Encrypt password when user is added
        admin.setPassword(bCryptPasswordEncoder.encode(admin.getPassword()));
        return arepo.save(admin);
    }
    

    //#################
    // READ FUNCTIONS
    //#################

    public List<Admin> getAllAdmins() {
        return arepo.findAll();
    }

    public Optional<Admin> getAdminById(int id) {
        return arepo.findById(id);
    }

    public Optional<Admin> getAdminByLname(String lname) {
        return arepo.findByLname(lname);
    }

    public Optional<Admin> getAdminByEmail(String email) {
        return arepo.findByEmail(email);
    }

    //#################
    // UPDATE FUNCTIONS
    //#################

    public Admin putAdmin(int id, Admin newAdminDetails) {
        Admin admin = arepo.findById(id)
            .orElseThrow(() -> new NoSuchElementException("🔴 ERROR: Admin record with ID " + id + " was NOT found."));
    
        if (newAdminDetails.getEmail() != null && !newAdminDetails.getEmail().isEmpty()) {
            admin.setEmail(newAdminDetails.getEmail());
        }
        if (newAdminDetails.getLname() != null && !newAdminDetails.getLname().isEmpty()) {
            admin.setLname(newAdminDetails.getLname());
        }
        if (newAdminDetails.getFname() != null && !newAdminDetails.getFname().isEmpty()) {
            admin.setFname(newAdminDetails.getFname());
        }
        if (newAdminDetails.getBirthDate() != null) {
            admin.setBirthDate(newAdminDetails.getBirthDate());
        }
        if (newAdminDetails.getPassword() != null && !newAdminDetails.getPassword().isEmpty()) {
            admin.setPassword(newAdminDetails.getPassword());
        }
        if (newAdminDetails.getPhoneNumber() != null && !newAdminDetails.getPhoneNumber().isEmpty()) {
            admin.setPhoneNumber(newAdminDetails.getPhoneNumber());
        }
        if (newAdminDetails.getAddress() != null && !newAdminDetails.getAddress().isEmpty()) {
            admin.setAddress(newAdminDetails.getAddress());
        }
        if (newAdminDetails.getCreatedAt() != null) {
            admin.setCreatedAt(newAdminDetails.getCreatedAt());
        }
        
        admin.setAge(newAdminDetails.getAge());
        
        return arepo.save(admin);
    }

    //#################
    // DELETE FUNCTIONS
    //#################

    public String deleteAdmin(int id) {
        if (!arepo.existsById(id)) {
            return "🔴 ERROR: Admin record with ID " + id + " was NOT found.";
        }

        arepo.deleteById(id);
        return "✅ SUCCESS: Admin record with ID " + id + " has been successfully deleted.";
    }

    //#################
    // AUTH FUNCTIONS
    //#################

    public boolean authenticateAdmin(String username, String password) {
        Authentication authentication =
         authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                username, 
                password
            )
        );

        return authentication.isAuthenticated();
    }

    public String generateTokenForAdmin(String username) {
        return jwtService.generateToken(username);
    }
}
