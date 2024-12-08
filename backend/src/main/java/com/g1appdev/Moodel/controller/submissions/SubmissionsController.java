package com.g1appdev.Moodel.controller.submissions;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.g1appdev.Moodel.entity.submissions.GroupSubmissions;
import com.g1appdev.Moodel.entity.submissions.IndividualSubmissions;
import com.g1appdev.Moodel.entity.submissions.Submissions;
import com.g1appdev.Moodel.service.submissions.SubmissionsService;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionsController {

    @Autowired
    private SubmissionsService sserv;

    //#################
    // UTILITY FUNCTIONS
    //#################

    @GetMapping("/test")
    public ResponseEntity<String> testConnection() {
        return ResponseEntity.status(HttpStatus.OK).body("✅ SUCCESS: Submissions API connected successfully!");
    }

    //#################
    // CREATE FUNCTIONS
    //#################

    @PostMapping("/create")
    public ResponseEntity<Submissions> create(@RequestBody Submissions submission) {
        Submissions newSubmission = sserv.postSubmissions(submission);
        return ResponseEntity.status(HttpStatus.CREATED).body(newSubmission);
    }

    @PostMapping("/createGroup")
    public ResponseEntity<GroupSubmissions> createGroupSubmission(@RequestBody GroupSubmissions groupSubmission) {
        GroupSubmissions newGroupSubmission = sserv.createGroupSubmission(groupSubmission);
        return ResponseEntity.status(HttpStatus.CREATED).body(newGroupSubmission);
    }

    @PostMapping("/createIndividual")
    public ResponseEntity<IndividualSubmissions> createIndividualSubmission(@RequestBody IndividualSubmissions individualSubmission) {
        IndividualSubmissions newIndividualSubmission = sserv.createIndividualSubmission(individualSubmission);
        return ResponseEntity.status(HttpStatus.CREATED).body(newIndividualSubmission);
    }

    //#################
    // READ FUNCTIONS
    //#################

    @GetMapping("/getAll")
    public ResponseEntity<List<Submissions>> getAllSubmissions() {
        List<Submissions> submissions = sserv.getAllSubmissions();
        return ResponseEntity.status(HttpStatus.OK).body(submissions);
    }

    @GetMapping("/getById")
    public ResponseEntity<Submissions> getSubmissionById(@RequestParam int id) {
        Optional<Submissions> submission = sserv.getSubmissionById(id);
        return submission.map(sub -> ResponseEntity.status(HttpStatus.OK).body(sub))
                         .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @GetMapping("/getByProjectId")
    public ResponseEntity<List<Submissions>> getSubmissionsByProjectId(@RequestParam int projectId) {
        List<Submissions> submissions = sserv.getSubmissionsByProjectId(projectId);
        return ResponseEntity.status(HttpStatus.OK).body(submissions);
    }

    @GetMapping("/getByProjectIdAndStudentId")
    public ResponseEntity<List<Submissions>> getSubmissionsByProjectId(@RequestParam int studentId, @RequestParam int projectId) {
        List<Submissions> submissions = sserv.getIndividualSubmissionsByProjectId(studentId, projectId);
        return ResponseEntity.status(HttpStatus.OK).body(submissions);
    }

    @GetMapping("/getByStudentId")
    public ResponseEntity<List<Submissions>> getSubmissionByStudentI(@RequestParam int studentId) {
        List<Submissions> submissions = sserv.getSubmissionByStudentId(studentId);
        return ResponseEntity.status(HttpStatus.OK).body(submissions);
    }


    //#################
    // UPDATE FUNCTIONS
    //#################

    @PutMapping("/update")
    public ResponseEntity<Submissions> update(@RequestBody Submissions updatedSubmission) {
        Submissions updated = sserv.putSubmission(updatedSubmission.getSubmissionId(), updatedSubmission);
        return ResponseEntity.status(HttpStatus.OK).body(updated);
    }

    //#################
    // DELETE FUNCTIONS
    //#################

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam int id) {
        try {
            sserv.deleteSubmission(id);
            return ResponseEntity.status(HttpStatus.OK).body("✅ SUCCESS: Submission deleted.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("🔴 ERROR: Submission not found.");
        }
    }
}
