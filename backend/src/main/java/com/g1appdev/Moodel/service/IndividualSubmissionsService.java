	package com.g1appdev.Moodel.service;
	
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Service;
	
	import com.g1appdev.Moodel.entity.IndividualSubmissions;
	import com.g1appdev.Moodel.respository.IndividualSubmissionRepo;
	
	import java.util.List;
	
	@Service
	public class IndividualSubmissionsService {
	
	    @Autowired
	    IndividualSubmissionRepo subRepo;
	
	    public IndividualSubmissionsService() {
	        super();
	    }
	
	    // C
	    public IndividualSubmissions postIndivSub(IndividualSubmissions sub) {
	        return subRepo.save(sub);
	    }
	
	    // Read all
	    public List<IndividualSubmissions> getAllIndivSubs() {
	        return subRepo.findAll();
	    }
	
	    // Find by ID
	    public IndividualSubmissions getIndivSubById(int id) {
	        return subRepo.findById(id).orElse(null);
	    }
	
	    // U
	    public IndividualSubmissions updateIndivSub(int id, IndividualSubmissions indivSubDetails) {
	        IndividualSubmissions sub = subRepo.findById(id).orElse(null);
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
	    public void deleteIndividualSubmission(int id) {
	        subRepo.deleteById(id);
	    }
	}
