package com.g1appdev.Moodel.respository.submissions;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.g1appdev.Moodel.entity.submissions.GroupSubmissions;

public interface GroupSubmissionsRepo extends JpaRepository<GroupSubmissions, Integer> {

    List<GroupSubmissions> findByOwnedByGroup_GroupId(Integer groupId);
    
}
