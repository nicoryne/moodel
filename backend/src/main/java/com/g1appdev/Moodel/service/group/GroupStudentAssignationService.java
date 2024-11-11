package com.g1appdev.Moodel.service.group;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.group.GroupStudentAssignation;
import com.g1appdev.Moodel.entity.group.GroupStudentAssignationKey;
import com.g1appdev.Moodel.respository.group.GroupStudentAssignationRepo;

@Service
public class GroupStudentAssignationService {
    
    @Autowired
    private GroupStudentAssignationRepo gsarepo;

    //#################
    // CREATE FUNCTIONS
    //#################

    public GroupStudentAssignation postGroupStudentAssignation(GroupStudentAssignation assignation) {
        return gsarepo.save(assignation);
    }

    //#################
    // READ FUNCTIONS
    //#################

    public List<GroupStudentAssignation> getAllGroupStudentAssignations() {
        return gsarepo.findAll();
    }

    public List<GroupStudentAssignation> getGroupStudentAssignationsByGroupId(int groupId) {
        return gsarepo.findByGroup_GroupId(groupId);
    }

    public List<GroupStudentAssignation> getGroupStudentAssignationsByStudentId(int studentId) {
        return gsarepo.findByStudent_StudentId(studentId);
    }

    //#################
    // UPDATE FUNCTIONS
    //#################

    public GroupStudentAssignation updateGroupStudentAssignation(int groupId, int studentId, GroupStudentAssignation newAssignationDetails) {
        GroupStudentAssignationKey gsakey = new GroupStudentAssignationKey(groupId, studentId);
        GroupStudentAssignation assignation = gsarepo.findById(gsakey)
            .orElseThrow(() -> new NoSuchElementException(
                "🔴 ERROR: GroupStudentAssignation with ID " + gsakey + " not found."
            ));

        assignation.setStudent(newAssignationDetails.getStudent());
        assignation.setGroup(newAssignationDetails.getGroup());
        
        return gsarepo.save(assignation);
    }

    //#################
    // DELETE FUNCTIONS
    //#################

    public String deleteGroupStudentAssignation(GroupStudentAssignationKey key) {
        if (!gsarepo.existsById(key)) {
            return "🔴 ERROR: GroupStudentAssignation with ID " + key + " not found.";
        }

        gsarepo.deleteById(key);
        return "✅ SUCCESS: GroupStudentAssignation with ID " + key + " has been successfully deleted.";
    }
}
