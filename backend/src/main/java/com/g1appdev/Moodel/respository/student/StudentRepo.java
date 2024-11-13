package com.g1appdev.Moodel.respository.student;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g1appdev.Moodel.entity.student.Student;

@Repository
public interface StudentRepo extends JpaRepository<Student, Integer> {

    public Optional<Student> findByLname(String lname);

    public Optional<Student> findByEmail(String email);
    
}

