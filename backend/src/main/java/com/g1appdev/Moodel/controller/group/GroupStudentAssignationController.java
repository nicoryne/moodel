package com.g1appdev.Moodel.controller.group;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.g1appdev.Moodel.entity.group.GroupStudentAssignation;
import com.g1appdev.Moodel.entity.group.GroupStudentAssignationKey;
import com.g1appdev.Moodel.service.group.GroupStudentAssignationService;

@RestController
@RequestMapping("/api/groupStudentAssignation")
public class GroupStudentAssignationController {
    
    @Autowired
    private GroupStudentAssignationService gsaserv;

    //#################
    // UTILITY FUNCTIONS
    //#################

    @GetMapping("/test")
    public String print() {
        return "✅ SUCCESS: GroupStudentAssignation API connected successfully!";
    }

    //#################
    // CREATE FUNCTIONS
    //#################

    @PostMapping("/create")
    public ResponseEntity<GroupStudentAssignation> create(@RequestBody GroupStudentAssignation assignation) {
        GroupStudentAssignation newAssignation = gsaserv.postGroupStudentAssignation(assignation);
        return ResponseEntity.status(HttpStatus.CREATED).body(newAssignation);
    }

    //#################
    // READ FUNCTIONS
    //#################

    @GetMapping("/getAll")
    public ResponseEntity<List<GroupStudentAssignation>> getAll() {
        List<GroupStudentAssignation> assignations = gsaserv.getAllGroupStudentAssignations();
        return ResponseEntity.status(HttpStatus.OK).body(assignations);
    }

    @GetMapping("/getByGroup")
    public ResponseEntity<List<GroupStudentAssignation>> getByGroupId(@RequestParam int groupId) {
        List<GroupStudentAssignation> assignations = gsaserv.getGroupStudentAssignationsByGroupId(groupId);
        return ResponseEntity.status(HttpStatus.OK).body(assignations);
    }

    @GetMapping("/getByStudent")
    public ResponseEntity<List<GroupStudentAssignation>> getByStudentId(@RequestParam int studentId) {
        List<GroupStudentAssignation> assignations = gsaserv.getGroupStudentAssignationsByStudentId(studentId);
        return ResponseEntity.status(HttpStatus.OK).body(assignations);
    }

    //#################
    // DELETE FUNCTIONS
    //#################

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam int groupId, @RequestParam int studentId) {
        String result = gsaserv.deleteGroupStudentAssignation(new GroupStudentAssignationKey(groupId, studentId));
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
