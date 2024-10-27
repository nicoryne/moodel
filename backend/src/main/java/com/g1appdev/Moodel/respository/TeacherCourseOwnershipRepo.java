package com.g1appdev.Moodel.respository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g1appdev.Moodel.entity.TeacherCourseOwnership;

@Repository
public interface TeacherCourseOwnershipRepo extends JpaRepository<TeacherCourseOwnership, Integer> {
    
    public TeacherCourseOwnership findByOwnershipDate(Date ownershipDate);

}
