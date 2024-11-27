package com.g1appdev.Moodel.service.group;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.group.Group;
import com.g1appdev.Moodel.respository.group.GroupRepo;

@Service
public class GroupService {
    
    @Autowired
    GroupRepo grepo;

    //#################
    // CREATE FUNCTIONS
    //#################

    public Group postGroupRecord(Group group) {
        return grepo.save(group);
    }

    //#################
    // READ FUNCTIONS
    //#################

    public List<Group> getAllGroups() {
        return grepo.findAll();
    }

    public Group getGroupById(int id) {
        return grepo.findById(id)
            .orElseThrow(() -> new NoSuchElementException("🔴 ERROR: Group record with ID " + id + " was NOT found."));
    }

    public Group getGroupByGroupNumber(int groupNumber) {
        return grepo.findByGroupNumber(groupNumber);
    }

    //#################
    // UPDATE FUNCTIONS
    //#################

    public Group updateGroupDetails(int id, Group newGroupDetails) {
        Group group = grepo.findById(id)
            .orElseThrow(() -> new NoSuchElementException("🔴 ERROR: Group record with ID " + id + " was NOT found."));
        
        group.setGroupNumber(newGroupDetails.getGroupNumber());
        return grepo.save(group);
    }

    //#################
    // DELETE FUNCTIONS
    //#################

    public String deleteGroup(int id) {
        if (!grepo.existsById(id)) {
            return "🔴 ERROR: Group record with ID " + id + " was NOT found.";
        }

        grepo.deleteById(id);
        return "✅ SUCCESS: Group record with ID " + id + " has been successfully deleted.";
    }
}
