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

import com.g1appdev.Moodel.Entity.IndividualSubmissionsEntity;
import com.g1appdev.Moodel.Service.IndividualSubmissionsService;

@RestController
@RequestMapping("/api/individualsubmissions")
public class IndividualSubmissionsController {

    @Autowired
    IndividualSubmissionsService indivSubService;

    // C
    @PostMapping("/postIndividualSubmission")
    public IndividualSubmissionsEntity postIndividualSubmission(@RequestBody IndividualSubmissionsEntity sub) {
        return indivSubService.postIndividualSubmission(sub);
    }

    // Read all
    @GetMapping("/getAllIndividualSubmission")
    public List<IndividualSubmissionsEntity> getAllIndividualSubmission() {
        return indivSubService.getAllIndividualSubmission();
    }

    // Read by ID
    @GetMapping("/getIndividualSubmissionById/{id}")
    public IndividualSubmissionsEntity getIndividualSubmissionById(@PathVariable int id) {
        return indivSubService.getIndividualSubmissionById(id);
    }

    // U
    @PutMapping("/updateIndividualSubmission/{id}")
    public IndividualSubmissionsEntity updateIndividualSubmission(@PathVariable int id, @RequestBody IndividualSubmissionsEntity subDetails) {
        return indivSubService.updateIndividualSubmission(id, subDetails);
    }

    // D
    @DeleteMapping("/deleteIndividualSubmission/{id}")
    public void deleteIndividualSubmission(@PathVariable int id) {
        indivSubService.deleteIndividualSubmission(id);
    }
}
