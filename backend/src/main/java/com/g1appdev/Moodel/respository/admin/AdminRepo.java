package com.g1appdev.Moodel.respository.admin;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g1appdev.Moodel.entity.admin.Admin;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Integer>{

    public Optional<Admin> findByLname(String lname);

    public Optional<Admin> findByEmail(String email);
}
