package com.g1appdev.Moodel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.g1appdev.Moodel.entity.StudentCourseEnrollment;
import com.g1appdev.Moodel.service.GroupStudentAssignationService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.g1appdev.Moodel.entity.GroupStudentAssignation;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(method = RequestMethod.GET, path = "/api/groupStudentAssignation")
public class GroupStudentAssignationController {
    
    @Autowired
    private GroupStudentAssignationService gsaserv;

    @GetMapping("/testConnection")
    public String getMethodName() {
        return "✅ SUCCESS: StudentCourseEnrollment API connected successfully!";
    }
    
    // CREATE
    @PostMapping("/create")
    public GroupStudentAssignation createEnrollment(@RequestBody GroupStudentAssignation assignation) {
        return gsaserv.createGroupStudentAssignation(assignation);
    }


    // READ ALL
    @GetMapping("/all")
    public List<GroupStudentAssignation> getAllGroupStudentAssignation() {
        return gsaserv.getAllGroupStudentAssignation();
    }

    // READ BY GROUP ID
    @GetMapping("/group/{groupId}")
    public List<GroupStudentAssignation> getGroupStudentAssignationByGroupId(@PathVariable int groupId) {
        return gsaserv.getGroupStudentAssignationByGroupId(groupId);
    }

    // READ BY STUDENT ID
    @GetMapping("/student/{studentId}")
    public List<GroupStudentAssignation> getGroupStudentAssignationByStudentId(@PathVariable int courseId) {
        return gsaserv.getGroupStudentAssignationByStudentId(courseId);
    }

    // DELETE
    @DeleteMapping("/delete/{groupId}/{studentId}")
    public String deleteGroupStudentAssignation(@PathVariable int groupId, @PathVariable int studentId) {
        return gsaserv.deleteGroupStudentAssignation(groupId, studentId);
    }

}
