package com.g1appdev.Moodel.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g1appdev.Moodel.entity.GroupSubmissions;

@Repository
public interface GroupSubmissionsRepo extends JpaRepository<GroupSubmissions, Integer>{

    public GroupSubmissions findBySubmissionId(int submissionId);

    public List<GroupSubmissions> findByGroup_GroupId(int groupId);
    
}
