package com.g1appdev.Moodel.respository.project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g1appdev.Moodel.entity.project.Projects;

import java.util.List;

@Repository
public interface ProjectsRepo extends JpaRepository<Projects, Integer> {

    public List<Projects> findByTitle(String title);

    public List<Projects> findByIsActive(boolean isActive);

    public List<Projects> findByCourse_CourseId(int courseId);

}
