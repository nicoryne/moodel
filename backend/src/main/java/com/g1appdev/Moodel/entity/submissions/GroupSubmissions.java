package com.g1appdev.Moodel.entity.submissions;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.g1appdev.Moodel.entity.group.Group;
import com.g1appdev.Moodel.entity.project.Projects;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "group_submissions")
public class GroupSubmissions extends Submissions {

    @ManyToOne
    @MapsId("groupId")
    @JoinColumn(name = "group_id", referencedColumnName="groupId")
    @JsonIgnoreProperties("groupSubmissions")
    private Group ownedByGroup;

    public GroupSubmissions() {}

    public GroupSubmissions(Group ownedByGroup, Projects assignedToProject) {
        this.ownedByGroup = ownedByGroup;
        this.setAssignedToProject(assignedToProject);
    }
    
    public GroupSubmissions(Group ownedByGroup, int accumulatedPoints, Projects assignedToProject, String description, String feedback, String fileURL, Date submissionDate, int submissionId) {
        super(accumulatedPoints, assignedToProject, description, feedback, fileURL, submissionDate, submissionId);
        this.ownedByGroup = ownedByGroup;
    }   

    public Group getOwnedByGroup() {
        return ownedByGroup;
    }

    public void setOwnedByGroup(Group ownedByGroup) {
        this.ownedByGroup = ownedByGroup;
    }

    
    
}
