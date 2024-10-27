package com.g1appdev.Moodel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.g1appdev.Moodel.entity.GroupSubmissions;
import com.g1appdev.Moodel.service.GroupSubmissionsService;

@RestController
@RequestMapping(method = RequestMethod.GET, path = "/api/group-submissions")
public class GroupSubmissionsController {

    @Autowired
    GroupSubmissionsService sserv;

    @GetMapping("/testConnection")
    public String print() {
        return "Group Submissions API connected successfully!";
    }

    // CREATE
    @PostMapping("/postSubmissionRecord")
    public GroupSubmissions postSubmissionRecord(@RequestBody GroupSubmissions submission) {
        return sserv.postSubmissionRecord(submission);
    }

    // READ
    @GetMapping("/getAllSubmissions")
    public List<GroupSubmissions> getAllSubmissions() {
        return sserv.getAllSubmissions();
    }

    // UPDATE
    @PutMapping("/putSubmissionDetails")
    public GroupSubmissions putSubmissionDetails(@RequestParam Long id, @RequestBody GroupSubmissions newSubmission) {
        return sserv.putSubmissionDetails(id, newSubmission);
    }

    // DELETE
    @DeleteMapping("/deleteSubmissionDetails/{id}")
    public String deleteSubmission(@PathVariable Long id) {
        return sserv.deleteSubmission(id);
    }
}
