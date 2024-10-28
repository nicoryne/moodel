	package com.g1appdev.Moodel.Service;
	
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Service;
	
	import com.g1appdev.Moodel.Entity.ProjectsEntity;
	import com.g1appdev.Moodel.Repository.ProjectsRepository;
	
	import java.util.List;
	
	@Service
	public class ProjectsService {
	
	    @Autowired
	    ProjectsRepository projectRepo;
	
	    public ProjectsService() {
	        super();
	    }
	
	    // C
	    public ProjectsEntity postProject(ProjectsEntity project) {
	        return projectRepo.save(project);
	    }
	
	    // Read all
	    public List<ProjectsEntity> getAllProjects() {
	        return projectRepo.findAll();
	    }
	
	    // Find by ID
	    public ProjectsEntity getProjectById(int id) {
	        return projectRepo.findById(id).orElse(null);
	    }
	
	    // U
	    public ProjectsEntity updateProject(int id, ProjectsEntity projectDetails) {
	        ProjectsEntity project = projectRepo.findById(id).orElse(null);
	        if (project != null) {
	            project.setTitle(projectDetails.getTitle());
	            project.setDescription(projectDetails.getDescription());
	            project.setSubmissionDeadline(projectDetails.getSubmissionDeadline());
	            project.setTurnedIn(projectDetails.isTurnedIn());
	            project.setAttainedPoints(projectDetails.getAttainedPoints());
	            project.setTotalPoints(projectDetails.getTotalPoints());
	            return projectRepo.save(project);
	        }
	        return null;
	    }
	
	    // D
	    public void deleteProject(int id) {
	        projectRepo.deleteById(id);
	    }
	}
