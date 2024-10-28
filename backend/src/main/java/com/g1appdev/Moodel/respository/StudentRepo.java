package com.g1appdev.Moodel.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g1appdev.Moodel.entity.Student;

@Repository
public interface StudentRepo extends JpaRepository<Student, Integer> {

    public Student findByLastName(String lastName);
    
}

