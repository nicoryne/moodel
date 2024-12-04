package com.g1appdev.Moodel.controller.project;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.g1appdev.Moodel.entity.project.Projects;
import com.g1appdev.Moodel.service.project.ProjectsService;

@RestController
@RequestMapping("/api/projects")
public class ProjectsController {

    @Autowired
    private ProjectsService pserv;

    //#################
    // UTILITY FUNCTIONS
    //#################

    @GetMapping("/test")
    public String print() {
        return "✅ SUCCESS: Projects API connected successfully!";
    }

    //#################
    // CREATE FUNCTIONS
    //#################

    @PostMapping("/create")
    public Projects create(@RequestBody Projects project) {
        return pserv.postProjectRecord(project);
    }

    //#################
    // READ FUNCTIONS
    //#################

    @GetMapping("/getAll")
    public List<Projects> getAll() {
        return pserv.getAllProjects();
    }

    @GetMapping("/getByCourseId")
    public List<Projects> getByCourseId(@RequestParam int courseId) {
        return pserv.getProjectsByCourseId(courseId);
    }

    @GetMapping("/getByTitle")
    public List<Projects> getByTitle(@RequestParam String title) {
        return pserv.getProjectsByTitle(title);
    }

    @GetMapping("/getByIsActive")
    public List<Projects> getByIsActive(@RequestParam boolean isActive) {
        return pserv.getProjectsByIsActive(isActive);
    }

    //#################
    // UPDATE FUNCTIONS
    //#################

    @PutMapping("/update")
    public Projects update(@RequestBody Projects newProject) {
        return pserv.putProjectDetails(newProject.getProjectId(), newProject);
    }

    //#################
    // DELETE FUNCTIONS
    //#################

    @DeleteMapping("/delete")
    public String delete(@RequestParam int id) {
        return pserv.deleteProject(id);
    }
}
