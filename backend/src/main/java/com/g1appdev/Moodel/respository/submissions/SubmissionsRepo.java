package com.g1appdev.Moodel.respository.submissions;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g1appdev.Moodel.entity.submissions.Submissions;

@Repository
public interface SubmissionsRepo extends JpaRepository<Submissions, Integer> {
    
    List<SubmissionsRepo> findBySubmissionDate(Date submissionDate);

}
