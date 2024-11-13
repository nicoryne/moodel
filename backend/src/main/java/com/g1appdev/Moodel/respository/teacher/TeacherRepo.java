package com.g1appdev.Moodel.respository.teacher;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g1appdev.Moodel.entity.teacher.Teacher;

@Repository
public interface TeacherRepo extends JpaRepository<Teacher, Integer> {

    public Optional<Teacher> findByLname(String lname);

    public Optional<Teacher> findByEmail(String email);
    
}
