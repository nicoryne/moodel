package com.g1appdev.Moodel.respository.group;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g1appdev.Moodel.entity.group.GroupStudentAssignation;
import com.g1appdev.Moodel.entity.group.GroupStudentAssignationKey;

import java.util.List;

@Repository
public interface GroupStudentAssignationRepo extends JpaRepository<GroupStudentAssignation, GroupStudentAssignationKey> {

    List<GroupStudentAssignation> findByGroup_GroupId(Integer GroupId);

    List<GroupStudentAssignation> findByStudent_StudentId(Integer studentId);

}
