package com.g1appdev.Moodel.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.Group;
import com.g1appdev.Moodel.entity.GroupSubmissions;
import com.g1appdev.Moodel.respository.GroupRepo;
import com.g1appdev.Moodel.respository.GroupSubmissionsRepo;

@Service
public class GroupSubmissionsService {
    
    @Autowired
    GroupSubmissionsRepo gsrepo;

    @Autowired
    GroupRepo grepo;

    public GroupSubmissionsService() {
        super();
    }

    //CREATE
    /*public GroupSubmissions postGroupSubmission(GroupSubmissions groupSubmission) {
        return gsrepo.save(groupSubmission);
    }*/

    public GroupSubmissions postGroupSubmission(int groupId, GroupSubmissions groupSubmission) {
        Group group = grepo.findById(groupId).orElseThrow(() -> new NoSuchElementException("Group not found"));
        groupSubmission.setGroup(group);  // Associate Group with GroupSubmission
        return gsrepo.save(groupSubmission);
    }

    //READ
    //read all group submissions
    public List<GroupSubmissions> getAllGroupSubmissions() {
        return gsrepo.findAll();
    }

    public List<GroupSubmissions> getGroupSubmissionsByGroupId(int groupId) {
        return gsrepo.findByGroup_GroupId(groupId);
    }

    /*
    //read a group submission by it's id
    public GroupSubmissions getGroupSubmissionsById(int id) {
        return gsrepo.findBySubmissionId(id);
    }
    */

    //UPDATE
    /*@SuppressWarnings("finally")
    public GroupSubmissions putGroupSubmissionsDetails(int submissionId, GroupSubmissions newGroupSubmissionsDetails) {
        GroupSubmissions groupSubmissions = new GroupSubmissions();
        try {
            groupSubmissions = gsrepo.findById(submissionId).get();

            groupSubmissions.setSubmissionDate(newGroupSubmissionsDetails.getSubmissionDate());
            groupSubmissions.setFeedback(newGroupSubmissionsDetails.getFeedback());
            groupSubmissions.setFileUrl(newGroupSubmissionsDetails.getFileUrl());
            groupSubmissions.setDescription(newGroupSubmissionsDetails.getDescription());
            groupSubmissions.setAccumulatedPoints(newGroupSubmissionsDetails.getAccumulatedPoints());
            
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException("Group Submission "+ submissionId + " not found");
        } finally {
            return gsrepo.save(groupSubmissions);
        }
    }*/

    public GroupSubmissions putGroupSubmissionsDetails(int submissionId, GroupSubmissions newDetails) {
        GroupSubmissions existingSubmission = gsrepo.findById(submissionId)
            .orElseThrow(() -> new NoSuchElementException("GroupSubmission not found"));
    
        existingSubmission.setSubmissionDate(newDetails.getSubmissionDate());
        existingSubmission.setFeedback(newDetails.getFeedback());
        existingSubmission.setFileUrl(newDetails.getFileUrl());
        existingSubmission.setDescription(newDetails.getDescription());
        existingSubmission.setAccumulatedPoints(newDetails.getAccumulatedPoints());
        // Leave the associated group unchanged
    
        return gsrepo.save(existingSubmission);
    }

    //DELETE
    public String deleteGroupSubmission(int submissionId) {
        if (!gsrepo.existsById(submissionId)) {
            return "GroupSubmission with ID " + submissionId + " was NOT found.";
        }

        gsrepo.deleteById(submissionId);
        return "GroupSubmission with ID " + submissionId + " has been successfully deleted.";
    }


}
