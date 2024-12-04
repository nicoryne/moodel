package com.g1appdev.Moodel.respository.submissions;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.g1appdev.Moodel.entity.submissions.IndividualSubmissions;

public interface IndividualSubmissionsRepo extends JpaRepository<IndividualSubmissions, Integer> {

    List<IndividualSubmissions> findByOwnedByStudent_StudentId(int studentId);

    List<IndividualSubmissions> findByOwnedByStudent_StudentIdAndAssignedToProject_ProjectId(int studentId, int projectId);

    
}
