package com.g1appdev.Moodel.respository.teacher;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g1appdev.Moodel.entity.teacher.TeacherCourseOwnership;
import com.g1appdev.Moodel.entity.teacher.TeacherCourseOwnershipKey;

@Repository
public interface TeacherCourseOwnershipRepo extends JpaRepository<TeacherCourseOwnership, TeacherCourseOwnershipKey> {
    
    public List<TeacherCourseOwnership> findByCreatedAt(Date createdAt);

    public List<TeacherCourseOwnership> findByTeacher_TeacherId(Integer teacherId);

    public List<TeacherCourseOwnership> findByCourse_CourseId(Integer courseId);

}
