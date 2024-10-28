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
    GroupSubmissionsRepo srepo;

    public GroupSubmissionsService() {
        super();
    }

    // CREATE
    public GroupSubmissions postSubmissionRecord(GroupSubmissions submission) {
        return srepo.save(submission);
    }

    // READ
    public List<GroupSubmissions> getAllSubmissions() {
        return srepo.findAll();
    }

    // UPDATE
    @SuppressWarnings("finally")
    public GroupSubmissions putSubmissionDetails(Long id, GroupSubmissions newSubmissionDetails) {
        GroupSubmissions submission = new GroupSubmissions();
        try {
            submission = srepo.findById(id).get();

            submission.setSubmissionDate(newSubmissionDetails.getSubmissionDate());
            submission.setFeedback(newSubmissionDetails.getFeedback());
            submission.setFileURL(newSubmissionDetails.getFileURL());
            submission.setDescription(newSubmissionDetails.getDescription());
            submission.setAccumulatedPoints(newSubmissionDetails.getAccumulatedPoints());
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException("Submission " + id + " not found");
        } finally {
            return srepo.save(submission);
        }
    }

    // DELETE
    public String deleteSubmission(Long id) {
        if (!srepo.existsById(id)) {
            return "Submission record with ID " + id + " was NOT found.";
        }

        srepo.deleteById(id);
        return "Submission record with ID " + id + " has been successfully deleted.";
    }
}