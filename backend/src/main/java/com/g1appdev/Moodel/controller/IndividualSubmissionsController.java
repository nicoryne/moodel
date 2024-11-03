package com.g1appdev.Moodel.controller;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g1appdev.Moodel.entity.IndividualSubmissions;
import com.g1appdev.Moodel.service.IndividualSubmissionsService;

@RestController
@RequestMapping("/api/individualsubmissions")
public class IndividualSubmissionsController {

    @Autowired
    IndividualSubmissionsService indivSubService;

    // C
    @PostMapping("/postIndividualSubmission")
    public IndividualSubmissions postIndividualSubmission(@RequestBody IndividualSubmissions sub) {
        return indivSubService.postIndivSub(sub);
    }

    // Read all
    @GetMapping("/getAllIndividualSubmission")
    public List<IndividualSubmissions> getAllIndividualSubmission() {
        return indivSubService.getAllIndivSubs();
    }

    // Read by ID
    @GetMapping("/getIndividualSubmissionById/{id}")
    public IndividualSubmissions getIndividualSubmissionById(@PathVariable int id) {
        return indivSubService.getIndivSubById(id);
    }

    // U
    @PutMapping("/updateIndividualSubmission/{id}")
    public IndividualSubmissions updateIndividualSubmission(@PathVariable int id, @RequestBody IndividualSubmissions subDetails) {
        return indivSubService.updateIndivSub(id, subDetails);
    }

    // D
    @DeleteMapping("/deleteIndividualSubmission/{id}")
    public void deleteIndividualSubmission(@PathVariable int id) {
        indivSubService.deleteIndividualSubmission(id);
    }
}
