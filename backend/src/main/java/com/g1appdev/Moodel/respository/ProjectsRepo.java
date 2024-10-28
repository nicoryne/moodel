package com.g1appdev.Moodel.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g1appdev.Moodel.entity.Projects;
import java.util.List;

@Repository
public interface ProjectsRepo extends JpaRepository<Projects, Long> {

    // Custom query to find projects by title
    public List<Projects> findByTitle(String title);

    // Custom query to find all active projects
    public List<Projects> findByIsActive(boolean isActive);
}
