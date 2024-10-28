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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.g1appdev.Moodel.entity.Group;
import com.g1appdev.Moodel.service.GroupService;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    @Autowired
    private GroupService gserv;

    @GetMapping("/testConnection")
    public String testConnection() {
        return "Group API connected successfully!";
    }

    //CREATE
    @PostMapping("/postGroupRecord")
    public Group postGroupRecord(@RequestBody Group group) {
        return gserv.postGroupRecord(group);
    }

    //READ
    @GetMapping("/getAllGroups")
    public List<Group> getAllGroups() {
        return gserv.getAllGroups();
    }

    //UPDATE
    @PutMapping("/updateGroupDetails")
    public Group updateGroupDetails(@RequestParam int id, @RequestBody Group groupDetails) {
        return gserv.updateGroupDetails(id, groupDetails);
    }


    //DELETE
    @DeleteMapping("/deleteGroup/{id}")
    public String deleteGroup(@PathVariable int id) {
        return gserv.deleteGroup(id);
    }

}