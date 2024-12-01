package com.g1appdev.Moodel.service.submissions;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.group.Group;
import com.g1appdev.Moodel.entity.project.Projects;
import com.g1appdev.Moodel.entity.student.Student;
import com.g1appdev.Moodel.entity.submissions.GroupSubmissions;
import com.g1appdev.Moodel.entity.submissions.IndividualSubmissions;
import com.g1appdev.Moodel.entity.submissions.Submissions;
import com.g1appdev.Moodel.respository.group.GroupRepo;
import com.g1appdev.Moodel.respository.project.ProjectsRepo;
import com.g1appdev.Moodel.respository.student.StudentRepo;
import com.g1appdev.Moodel.respository.submissions.SubmissionsRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class SubmissionsService {

    @Autowired
    private SubmissionsRepo srepo;

    @Autowired
    private GroupRepo groupRepo;

    @Autowired
    private ProjectsRepo projectsRepo;

    @Autowired
    private StudentRepo studentRepo;

    //#################
    // CREATE HELPER METHOD
    //#################

    public Submissions saveSubmissionDetails(Submissions submission) {
        int projectId = submission.getAssignedToProject().getProjectId();
        Projects projects = projectsRepo.findById(projectId)
            .orElseThrow(() -> new EntityNotFoundException("🔴 ERROR: Project record with ID " + projectId + " was NOT found."));

        submission.setAssignedToProject(projects);
        return srepo.save(submission);
    }

    //#################
    // CREATE Group Submission
    //#################

    /*
    public GroupSubmissions createGroupSubmission(GroupSubmissions groupSubmission) {
        Group group = groupRepo.findById(groupSubmission.getGroup().getGroupId())
            .orElseThrow(() -> new NoSuchElementException("🔴 ERROR: Group not found"));

        groupSubmission.setGroup(group);


        return (GroupSubmissions) saveSubmissionDetails(groupSubmission);
    }
    */
    
    public GroupSubmissions createGroupSubmission(GroupSubmissions groupSubmission) {
        if (groupSubmission.getOwnedByGroup() == null || groupSubmission.getOwnedByGroup().getGroupId() <= 0) {
            throw new IllegalArgumentException("🔴 ERROR: Group is missing or invalid.");
        }
    
        Group group = groupRepo.findById(groupSubmission.getOwnedByGroup().getGroupId())
            .orElseThrow(() -> new NoSuchElementException("🔴 ERROR: Group with ID " + groupSubmission.getOwnedByGroup().getGroupId() + " was NOT found."));
    
        groupSubmission.setOwnedByGroup(group);
    
        if (groupSubmission.getAssignedToProject() == null || groupSubmission.getAssignedToProject().getProjectId() <= 0) {
            throw new IllegalArgumentException("🔴 ERROR: Assigned project is missing or invalid.");
        }
    
        Projects project = projectsRepo.findById(groupSubmission.getAssignedToProject().getProjectId())
            .orElseThrow(() -> new NoSuchElementException("🔴 ERROR: Project with ID " + groupSubmission.getAssignedToProject().getProjectId() + " was NOT found."));
    
        groupSubmission.setAssignedToProject(project);
    
        return (GroupSubmissions) saveSubmissionDetails(groupSubmission);
    }
    

    //#################
    // CREATE Individual Submission
    //#################

    public IndividualSubmissions createIndividualSubmission(IndividualSubmissions individualSubmission) {
        Student student = studentRepo.findById(individualSubmission.getOwnedByStudent().getStudentId())
            .orElseThrow(() -> new NoSuchElementException("🔴 ERROR: Student not found"));

        individualSubmission.setOwnedByStudent(student);

        return (IndividualSubmissions) saveSubmissionDetails(individualSubmission);
    }

    //#################
    // CREATE Submissions (General)
    //#################

    public Submissions postSubmissions(Submissions submission) {
        if (submission.getAssignedToProject() == null || submission.getAssignedToProject().getProjectId() == 0) {
            throw new IllegalArgumentException("Project must be assigned to the submission.");
        }
    
        Projects project = projectsRepo.findById(submission.getAssignedToProject().getProjectId())
            .orElseThrow(() -> new NoSuchElementException("🔴 ERROR: Project not found"));
    
        submission.setAssignedToProject(project);
        return srepo.save(submission);
    }
    
    

    //#################
    // READ FUNCTIONS
    //#################

    public List<Submissions> getAllSubmissions() {
        return srepo.findAll();
    }

    public Optional<Submissions> getSubmissionById(int id) {
        return srepo.findById(id);
    }

    //#################
    // UPDATE FUNCTIONS
    //#################

    public Submissions putSubmission(int id, Submissions updatedSubmission) {
        Submissions submission = srepo.findById(id)
            .orElseThrow(() -> new NoSuchElementException("🔴 ERROR: Submission record with ID " + id + " was NOT found."));

        submission.setAccumulatedPoints(updatedSubmission.getAccumulatedPoints());
        submission.setDescription(updatedSubmission.getDescription());
        submission.setFeedback(updatedSubmission.getFeedback());
        submission.setFileURL(updatedSubmission.getFileURL());
        submission.setSubmissionDate(updatedSubmission.getSubmissionDate());

        return saveSubmissionDetails(submission);
    }

    //#################
    // DELETE FUNCTIONS
    //#################

    public void deleteSubmission(int id) {
        if (!srepo.existsById(id)) {
            throw new RuntimeException("Submission not found");
        }
        srepo.deleteById(id);
    }
}
