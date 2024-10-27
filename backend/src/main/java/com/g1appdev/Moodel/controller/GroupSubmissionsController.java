package com.g1appdev.Moodel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.g1appdev.Moodel.entity.GroupSubmissions;
import com.g1appdev.Moodel.service.GroupSubmissionsService;


@RestController
@RequestMapping(method = RequestMethod.GET, path="/api/group-submissions")
public class GroupSubmissionsController {
    
    @Autowired
    GroupSubmissionsService gsserv;

    @GetMapping("/testConnection")
    public String print() {
        return "Group Submissions API connected sucessfully!";
    }

    //CREATE
    @PostMapping("/postGroupSubmissionsRecord")
    public GroupSubmissions GroupSubmissions(@RequestBody GroupSubmissions groupSubmissions) {
        return gsserv.postGroupSubmissionsRecord(groupSubmissions);
    }    
    
    //READ
    @GetMapping("/getAllGroupSubmissions")
    public List<GroupSubmissions> getAllGroupSubmissionses() {
        return gsserv.getAllGroupSubmissions();
    }

    @GetMapping("/getGroupSubmission/{id}")
    public GroupSubmissions getGroupSubmissionsById(@PathVariable int id) {
        GroupSubmissions groupSubmissions = gsserv.getGroupSubmissionsById(id);
        if (groupSubmissions != null) {
            return groupSubmissions;
        }
        return null;
    }
    

    //UPDATE
    @PutMapping("/putGroupSubmissionsDetails")
    public GroupSubmissions putGroupSubmissions (@RequestParam int id, @RequestBody GroupSubmissions newGroupSubmissions) {
        return gsserv.putGroupSubmissionsDetails(id, newGroupSubmissions);
    }

    //DELETE
    @DeleteMapping("/deleteGroupSubmissionsDetails/{id}")
    public String deleteGroupSubmissions(@PathVariable int id) {
        return gsserv.deleteGroupSubmissions(id);
    }    

}
