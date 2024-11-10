package com.g1appdev.Moodel.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.Group;
import com.g1appdev.Moodel.respository.GroupRepo;

@Service
public class GroupService {
    
    @Autowired
    GroupRepo grepo;

    public GroupService() {
        super();
    }

    //CREATE
    public Group postGroupRecord(Group group) {
        return grepo.save(group);
    }

    //READ
    public List<Group> getAllGroups() {
        return grepo.findAll();
    }

    //UPDATE
    @SuppressWarnings("finally")
    public Group updateGroupDetails(int id, Group newGroupDetails) {
        Group group = new Group();
        try {
            group = grepo.findById(id).get();

            group.setGroupNumber(newGroupDetails.getGroupNumber());

        } catch (NoSuchElementException e){
            throw new NoSuchElementException("Group "+ id + " not found.");
        } finally {
            return grepo.save(group);
        }
    } 

    //DELETE
    public String deleteGroup(int groupId) {
        Group group = grepo.findById(groupId).orElseThrow(() -> new NoSuchElementException("Group not found"));
    
        if (!group.getGroupSubmissions().isEmpty()) {
            return "Cannot delete Group with existing submissions.";
        }
    
        grepo.delete(group);
        return "Group successfully deleted.";
    }

}
