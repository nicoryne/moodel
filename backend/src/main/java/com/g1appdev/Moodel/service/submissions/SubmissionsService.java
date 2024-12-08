package com.g1appdev.Moodel.service.submissions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.g1appdev.Moodel.entity.submissions.GroupSubmissions;
import com.g1appdev.Moodel.entity.submissions.IndividualSubmissions;
import com.g1appdev.Moodel.entity.submissions.Submissions;
import com.g1appdev.Moodel.entity.group.Group;
import com.g1appdev.Moodel.entity.project.Projects;
import com.g1appdev.Moodel.entity.student.Student;
import com.g1appdev.Moodel.respository.submissions.GroupSubmissionsRepo;
import com.g1appdev.Moodel.respository.submissions.IndividualSubmissionsRepo;
import com.g1appdev.Moodel.respository.submissions.SubmissionsRepo;
import com.g1appdev.Moodel.service.utils.FileStorageService;

import jakarta.persistence.EntityNotFoundException;

import com.g1appdev.Moodel.respository.group.GroupRepo;
import com.g1appdev.Moodel.respository.project.ProjectsRepo;
import com.g1appdev.Moodel.respository.student.StudentRepo;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SubmissionsService {

    @Autowired
    private SubmissionsRepo srepo;

    @Autowired
    FileStorageService fileStorageService;

    @Autowired
    private IndividualSubmissionsRepo isrepo;

    @Autowired
    private GroupSubmissionsRepo gsrepo;

    @Autowired
    private GroupRepo groupRepo;

    @Autowired
    private ProjectsRepo projectsRepo;

    @Autowired
    private StudentRepo studentRepo;

  

    //#################
    // CREATE HELPER METHOD
    //#################

    private Submissions saveSubmissionDetails(Submissions submission) {
        int projectId = submission.getAssignedToProject().getProjectId();
        Projects projects = projectsRepo.findById(projectId)
            .orElseThrow(() -> new EntityNotFoundException("🔴 ERROR: Project record with ID " + projectId + " was NOT found."));

        submission.setAssignedToProject(projects);
        return srepo.save(submission);
    }

    //#################
    // CREATE Group Submission
    //#################

    public GroupSubmissions createGroupSubmission(GroupSubmissions groupSubmission) {
        Group group = groupRepo.findById(groupSubmission.getGroup().getGroupId())
            .orElseThrow(() -> new NoSuchElementException("🔴 ERROR: Group not found"));

        groupSubmission.setGroup(group);


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
        return saveSubmissionDetails(submission);
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

    public List<Submissions> getSubmissionsByProjectId(int projectId) {
        return srepo.findByAssignedToProject_ProjectId(projectId);
    }

    public List<Submissions> getIndividualSubmissionsByProjectId(int studentId, int projectId) {
        List<Submissions> allSubmissions = srepo.findByAssignedToProject_ProjectId(projectId);

        return allSubmissions.stream()
            .filter(submission -> submission instanceof IndividualSubmissions) 
            .filter(submission -> 
                ((IndividualSubmissions) submission).getOwnedByStudent().getStudentId() == studentId
            )
            .collect(Collectors.toList());
    }

    public List<Submissions> getSubmissionByStudentId(int studentId) {
        List<Submissions> allSubmissions = srepo.findAll();

        return allSubmissions.stream()
            .filter(submission -> submission instanceof IndividualSubmissions) 
            .filter(submission -> 
                ((IndividualSubmissions) submission).getOwnedByStudent().getStudentId() == studentId
            )
            .collect(Collectors.toList());
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
