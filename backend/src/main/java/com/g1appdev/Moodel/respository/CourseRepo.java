package com.g1appdev.Moodel.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g1appdev.Moodel.entity.Course;


@Repository
public interface CourseRepo extends JpaRepository<Course, Integer> {

    public Course findByTitle(String title);
    
}
