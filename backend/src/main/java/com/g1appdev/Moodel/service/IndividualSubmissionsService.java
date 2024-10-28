	package com.g1appdev.Moodel.Service;
	
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Service;
	
	import com.g1appdev.Moodel.Entity.IndividualSubmissionsEntity;
	import com.g1appdev.Moodel.Repository.IndividualSubmissionsRepo;
	
	import java.util.List;
	
	@Service
	public class IndividualSubmissionsService {
	
	    @Autowired
	    IndividualSubmissionsRepository subRepo;
	
	    public IndividualSubmissionsService() {
	        super();
	    }
	
	    // C
	    public IndividualSubmissionsEntity postIndivSub(IndividualSubmissionsEntity sub) {
	        return subRepo.save(sub);
	    }
	
	    // Read all
	    public List<IndividualSubmissionsEntity> getAllIndivSubs() {
	        return subRepo.findAll();
	    }
	
	    // Find by ID
	    public IndividualSubmissionsEntity getIndivSubById(int id) {
	        return subRepo.findById(id).orElse(null);
	    }
	
	    // U
	    public IndividualSubmissionsEntity updateIndivSub(int id, IndividualSubmissionsEntity indivSubDetails) {
	        IndividualSubmissionsEntity sub = subRepo.findById(id).orElse(null);
	        if (sub != null) {
	            sub.setSubmissionId(indivSubDetails.getSubmissionId());
	            sub.setProjectId(indivSubDetails.getProjectId());
	            sub.setSubmissionDate(indivSubDetails.getSubmissionDate());
	            sub.setFeedback(indivSubDetails.getFeedback());
	            sub.setFileURL(indivSubDetails.getFileURL());
	            sub.setDescription(indivSubDetails.getDescription());
        	    sub.setAccumulatedPoints(indivSubDetails.getAccumulatedPoints());
	            return subRepo.save(sub);
	        }
	        return null;
	    }
	
	    // D
	    public void deleteProject(int id) {
	        subRepo.deleteById(id);
	    }
	}
