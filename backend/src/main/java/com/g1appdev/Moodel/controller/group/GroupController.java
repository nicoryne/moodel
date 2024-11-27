package com.g1appdev.Moodel.controller.group;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.g1appdev.Moodel.entity.group.Group;
import com.g1appdev.Moodel.service.group.GroupService;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    @Autowired
    private GroupService gserv;

    //#################
    // UTILITY FUNCTIONS
    //#################

    @GetMapping("/test")
    public ResponseEntity<String> print() {
        return ResponseEntity.status(HttpStatus.OK).body("✅ SUCCESS: Group API connected successfully!");
    }

    //#################
    // CREATE FUNCTIONS
    //#################

    @PostMapping("/create")
    public ResponseEntity<Group> postGroupRecord(@RequestBody Group group) {
        Group newGroup = gserv.postGroupRecord(group);
        return ResponseEntity.status(HttpStatus.CREATED).body(newGroup);
    }

    //#################
    // READ FUNCTIONS
    //#################

    @GetMapping("/getAll")
    public ResponseEntity<List<Group>> getAllGroups() {
        List<Group> groups = gserv.getAllGroups();
        return ResponseEntity.status(HttpStatus.OK).body(groups);
    }

    @GetMapping("/getById")
    public ResponseEntity<Group> getGroupById(@RequestParam int id) {
        Group group = gserv.getGroupById(id);
        return ResponseEntity.status(HttpStatus.OK).body(group);
    }

    //#################
    // UPDATE FUNCTIONS
    //#################

    @PutMapping("/update")
    public ResponseEntity<Group> updateGroupDetails(@RequestParam int id, @RequestBody Group groupDetails) {
        Group updatedGroup = gserv.updateGroupDetails(id, groupDetails);
        return ResponseEntity.status(HttpStatus.OK).body(updatedGroup);
    }

    //#################
    // DELETE FUNCTIONS
    //#################

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteGroup(@RequestParam int id) {
        String result = gserv.deleteGroup(id);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
