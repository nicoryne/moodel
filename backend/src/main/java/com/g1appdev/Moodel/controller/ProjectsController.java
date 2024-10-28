package com.g1appdev.Moodel.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g1appdev.Moodel.Entity.ProjectsEntity;
import com.g1appdev.Moodel.Service.ProjectsService;

@RestController
@RequestMapping("/api/projects")
public class ProjectsController {

    @Autowired
    ProjectsService projectService;

    // C
    @PostMapping("/postProject")
    public ProjectsEntity postProject(@RequestBody ProjectsEntity project) {
        return projectService.postProject(project);
    }

    // Read all
    @GetMapping("/getAllProjects")
    public List<ProjectsEntity> getAllProjects() {
        return projectService.getAllProjects();
    }

    // Read by ID
    @GetMapping("/getProjectById/{id}")
    public ProjectsEntity getProjectById(@PathVariable int id) {
        return projectService.getProjectById(id);
    }

    // U
    @PutMapping("/updateProject/{id}")
    public ProjectsEntity updateProject(@PathVariable int id, @RequestBody ProjectsEntity projectDetails) {
        return projectService.updateProject(id, projectDetails);
    }

    // D
    @DeleteMapping("/deleteProject/{id}")
    public void deleteProject(@PathVariable int id) {
        projectService.deleteProject(id);
    }
}
