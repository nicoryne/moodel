package com.g1appdev.Moodel.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g1appdev.Moodel.entity.Teacher;

@Repository
public interface TeacherRepo extends JpaRepository<Teacher, Integer> {

    public Teacher findByLname(String lname);

    public Teacher findByEmail(String email);
    
}
