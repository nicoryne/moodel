package com.g1appdev.Moodel.controller.admin;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.g1appdev.Moodel.entity.admin.Admin;
import com.g1appdev.Moodel.entity.teacher.Teacher;
import com.g1appdev.Moodel.security.entities.AuthRequest;
import com.g1appdev.Moodel.service.admin.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService aserv;

    //#################
    // UTILITY FUNCTIONS
    //#################

    @GetMapping("/test")
    public ResponseEntity<String> testConnection() {
        return ResponseEntity.status(HttpStatus.OK).body("✅ SUCCESS: Admin API connected successfully!");
    }

    //#################
    // CREATE FUNCTIONS
    //#################

    @PostMapping("/create")
    public ResponseEntity<Admin> create(@RequestBody Admin admin) {
        Admin newAdmin = aserv.postAdminRecord(admin);
        return ResponseEntity.status(HttpStatus.CREATED).body(newAdmin);
    }

    //#################
    // READ FUNCTIONS
    //#################

    @GetMapping("/getAll")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> admins = aserv.getAllAdmins();
        return ResponseEntity.status(HttpStatus.OK).body(admins);
    }

    @GetMapping("/getById")
    public ResponseEntity<Optional<Admin>> getAdminById(@RequestParam int id) {
        Optional<Admin> admin = aserv.getAdminById(id);
        return ResponseEntity.status(HttpStatus.OK).body(admin);
    }

    @GetMapping("/getByLname")
    public ResponseEntity<Optional<Admin>> getAdminByLname(@RequestParam String lname) {
        Optional<Admin> admin = aserv.getAdminByLname(lname);
        return ResponseEntity.status(HttpStatus.OK).body(admin);
    }

    @GetMapping("/getByEmail")
    public ResponseEntity<Optional<Admin>> getAdminByEmail(@RequestParam String email) {
        Optional<Admin> admin = aserv.getAdminByEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(admin);
    }

    //#################
    // UPDATE FUNCTIONS
    //#################

    @PutMapping("/update")
    public ResponseEntity<Admin> update(@RequestParam int id, @RequestBody Admin newAdminDetails) {
        Admin updatedAdmin = aserv.updateAdminDetails(id, newAdminDetails);
        return ResponseEntity.status(HttpStatus.OK).body(updatedAdmin);
    }

    //#################
    // DELETE FUNCTIONS
    //#################

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam int id) {
        String result = aserv.deleteAdmin(id);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    //#################
    // AUTH FUNCTIONS
    //#################

    @PostMapping("/register")
    public ResponseEntity<Admin> registerAdmin(@RequestBody Admin admin) {
        Admin newAdmin = aserv.postAdminRecord(admin);
        return ResponseEntity.status(HttpStatus.CREATED).body(newAdmin);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest authRequest) {
        String username = authRequest.getUsername();
        String password = authRequest.getPassword();

        if (username == null || password == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("🔴 ERROR: Missing username or password");
        }

        boolean isAuthenticated = aserv.authenticateAdmin(username, password);
        if (!isAuthenticated) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("🔴 ERROR: Invalid credentials");
        }

        String token = aserv.generateTokenForAdmin(username);
        return ResponseEntity.ok(token);
    }
}
