package com.g1appdev.Moodel.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.g1appdev.Moodel.entity.GroupStudentAssignation;
import com.g1appdev.Moodel.entity.GroupStudentAssignationKey;

@Repository
public interface GroupStudentAssignationRepo extends JpaRepository<GroupStudentAssignation, GroupStudentAssignationKey> {

    List<GroupStudentAssignation> findByGroup_GroupId(int groupId);

    List<GroupStudentAssignation> findByStudent_StudentId(int studentId);
}
