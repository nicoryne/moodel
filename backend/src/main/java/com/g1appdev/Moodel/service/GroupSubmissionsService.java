package com.g1appdev.Moodel.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.GroupSubmissions;
import com.g1appdev.Moodel.respository.GroupSubmissionsRepo;

@Service
public class GroupSubmissionsService {
    
    @Autowired
    GroupSubmissionsRepo gsrepo;

    public GroupSubmissionsService() {
        super();
    }

    //CREATE
    public GroupSubmissions postGroupSubmission(GroupSubmissions groupSubmission) {
        return gsrepo.save(groupSubmission);
    }

    //READ
    //read all group submissions
    public List<GroupSubmissions> getAllGroupSubmissions() {
        return gsrepo.findAll();
    }

    /*
    //read a group submission by it's id
    public GroupSubmissions getGroupSubmissionsById(int id) {
        return gsrepo.findBySubmissionId(id);
    }
    */

    //UPDATE
    @SuppressWarnings("finally")
    public GroupSubmissions putGroupSubmissionsDetails(int submissionId, GroupSubmissions newGroupSubmissionsDetails) {
        GroupSubmissions groupSubmissions = new GroupSubmissions();
        try {
            groupSubmissions = gsrepo.findById(submissionId).get();

            groupSubmissions.setSubmissionDate(newGroupSubmissionsDetails.getSubmissionDate());
            groupSubmissions.setFeedback(newGroupSubmissionsDetails.getFeedback());
            groupSubmissions.setFileUrl(newGroupSubmissionsDetails.getFileUrl());
            groupSubmissions.setDescription(newGroupSubmissionsDetails.getDescription());
            groupSubmissions.setAccumilatedPoints(newGroupSubmissionsDetails.getAccumilatedPoints());
            
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException("Group Submission "+ submissionId + " not found");
        } finally {
            return gsrepo.save(groupSubmissions);
        }
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
