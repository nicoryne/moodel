package com.g1appdev.Moodel.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.g1appdev.Moodel.Entity.ProjectsEntity;
import com.g1appdev.Moodel.Entity.CourseEntity;


@Repository
public interface ProjectsRepository extends JpaRepository<ProjectsEntity, Integer> {
	List<ProjectsEntity> findByCourse(CourseEntity course);
}
