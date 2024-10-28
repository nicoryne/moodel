package com.g1appdev.Moodel.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.Projects;
import com.g1appdev.Moodel.respository.ProjectsRepo;

@Service
public class ProjectsService {

    @Autowired
    ProjectsRepo prepo;

    public ProjectsService() {
        super();
    }

    // CREATE
    public Projects postProjectRecord(Projects project) {
        return prepo.save(project);
    }

    // READ
    public List<Projects> getAllProjects() {
        return prepo.findAll();
    }

    // UPDATE
    @SuppressWarnings("finally")
    public Projects putProjectDetails(Long id, Projects newProjectDetails) {
        Projects project = new Projects();
        try {
            project = prepo.findById(id).get();

            project.setTitle(newProjectDetails.getTitle());
            project.setDescription(newProjectDetails.getDescription());
            project.setSubmissionDeadline(newProjectDetails.getSubmissionDeadline());
            project.setTotalPoints(newProjectDetails.getTotalPoints());
            project.setActive(newProjectDetails.isActive());
            project.setGroupProject(newProjectDetails.isGroupProject());
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException("Project " + id + " not found");
        } finally {
            return prepo.save(project);
        }
    }

    // DELETE
    public String deleteProject(Long id) {
        if (!prepo.existsById(id)) {
            return "Project record with ID " + id + " was NOT found.";
        }

        prepo.deleteById(id);
        return "Project record with ID " + id + " has been successfully deleted.";
    }
}
