package com.g1appdev.Moodel.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g1appdev.Moodel.entity.GroupSubmissions;
import java.util.List;

@Repository
public interface GroupSubmissionsRepo extends JpaRepository<GroupSubmissions, Long> {

    // Custom query to find submissions by description
    public List<GroupSubmissionsRepo> findByDescription(String description);

    // Custom query to find submissions by accumulated points greater than a certain value
    public List<GroupSubmissionsRepo> findByAccumulatedPointsGreaterThan(int points);
}