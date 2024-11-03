package com.g1appdev.Moodel.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.GroupStudentAssignation;
import com.g1appdev.Moodel.entity.GroupStudentAssignationKey;
import com.g1appdev.Moodel.respository.GroupStudentAssignationRepo;

@Service
public class GroupStudentAssignationService {
    
    @Autowired
    private GroupStudentAssignationRepo gsarepo;

    // CREATE
    public GroupStudentAssignation createGroupStudentAssignation(GroupStudentAssignation assignation) {
        return gsarepo.save(assignation);
    }

    // READ ALL
    public List<GroupStudentAssignation> getAllGroupStudentAssignation() {
        return gsarepo.findAll();
    }

    // READ BY GROUP ID
    public List<GroupStudentAssignation> getGroupStudentAssignationByGroupId(int groupId) {
        return gsarepo.findByGroup_GroupId(groupId);
    }

    // READ BY STUDENT ID
    public List<GroupStudentAssignation> getGroupStudentAssignationByStudentId(int studentId) {
        return gsarepo.findByStudent_StudentId(studentId);
    }

    // DELETE
    public String deleteGroupStudentAssignation(int groupId, int studentId) {
        GroupStudentAssignationKey gsakey = new GroupStudentAssignationKey(groupId, studentId);

        GroupStudentAssignation gsa = gsarepo.findById(gsakey)
            .orElseThrow(() -> new NoSuchElementException(
                "🔴 ERROR: Enrollment with ID " + gsakey + " not found."
            ));

            gsarepo.deleteById(gsakey);
        return "✅ SUCCESS: Enrollment with ID " + gsakey + " has been successfully deleted.";
    }
}
