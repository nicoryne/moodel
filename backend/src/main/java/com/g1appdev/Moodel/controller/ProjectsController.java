package com.g1appdev.Moodel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.g1appdev.Moodel.entity.Projects;
import com.g1appdev.Moodel.service.ProjectsService;

@RestController
@RequestMapping(method = RequestMethod.GET, path = "/api/projects")
public class ProjectsController {

    @Autowired
    ProjectsService pserv;

    @GetMapping("/testConnection")
    public String print() {
        return "Projects API connected successfully!";
    }

    // CREATE
    @PostMapping("/postProjectRecord")
    public Projects postProjectRecord(@RequestBody Projects project) {
        return pserv.postProjectRecord(project);
    }

    // READ
    @GetMapping("/getAllProjects")
    public List<Projects> getAllProjects() {
        return pserv.getAllProjects();
    }

    // UPDATE
    @PutMapping("/putProjectDetails")
    public Projects putProjectDetails(@RequestParam Long id, @RequestBody Projects newProject) {
        return pserv.putProjectDetails(id, newProject);
    }

    // DELETE
    @DeleteMapping("/deleteProjectDetails/{id}")
    public String deleteProject(@PathVariable Long id) {
        return pserv.deleteProject(id);
    }
}