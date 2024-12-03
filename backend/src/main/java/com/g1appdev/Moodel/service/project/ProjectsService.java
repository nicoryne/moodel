package com.g1appdev.Moodel.service.project;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.course.Course;
import com.g1appdev.Moodel.entity.project.Projects;
import com.g1appdev.Moodel.respository.course.CourseRepo;
import com.g1appdev.Moodel.respository.project.ProjectsRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProjectsService {

    @Autowired
    private ProjectsRepo prepo;

    @Autowired
    private CourseRepo crepo;

    //#################
    // CREATE FUNCTIONS
    //#################

    public Projects postProjectRecord(Projects project) {
        int courseId = project.getCourse().getCourseId();
        Course course = crepo.findById(courseId)
            .orElseThrow(() -> new EntityNotFoundException("🔴 ERROR: Course record with ID " + courseId + " was NOT found."));

        project.setCourse(course);

        return prepo.save(project);
    }

    //#################
    // READ FUNCTIONS
    //#################

    public List<Projects> getAllProjects() {
        return prepo.findAll();
    }

    public List<Projects> getProjectsByCourseId(int courseId) {
        return prepo.findByCourse_CourseId(courseId);
    }

    public List<Projects> getProjectsByTitle(String title) {
        return prepo.findByTitle(title);
    }

    public List<Projects> getProjectsByIsActive(boolean isActive) {
        return prepo.findByIsActive(isActive);
    }

    //#################
    // UPDATE FUNCTIONS
    //#################

    public Projects putProjectDetails(int id, Projects newProjectDetails) {
        Projects project = prepo.findById(id)
            .orElseThrow(() -> new NoSuchElementException("🔴 ERROR: Project record with ID " + id + " was NOT found."));

        project.setTitle(newProjectDetails.getTitle());
        project.setDescription(newProjectDetails.getDescription());
        project.setSubmissionDeadline(newProjectDetails.getSubmissionDeadline());
        project.setTotalPoints(newProjectDetails.getTotalPoints());
        project.setActive(newProjectDetails.isActive());
        project.setGroupProject(newProjectDetails.isGroupProject());

        if (newProjectDetails.getCourse() != null) {
            project.setCourse(newProjectDetails.getCourse());
        }

        return prepo.save(project);
    }

    //#################
    // DELETE FUNCTIONS
    //#################

    public String deleteProject(int id) {
        if (!prepo.existsById(id)) {
            return "🔴 ERROR: Project record with ID " + id + " was NOT found.";
        }

        prepo.deleteById(id);
        return "✅ SUCCESS: Project record with ID " + id + " has been successfully deleted.";
    }
}
