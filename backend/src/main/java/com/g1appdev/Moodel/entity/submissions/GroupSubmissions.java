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
    @JoinColumn(name = "group_id", referencedColumnName="groupId", nullable = false)
    @JsonIgnoreProperties("groupSubmissions")
    private Group ownedByGroup;

    public GroupSubmissions() {}



    public GroupSubmissions(int submissionId, Date submissionDate, String feedback, String fileURL, String description,
            int accumulatedPoints, Projects assignedToProject, Group ownedByGroup) {
        super(submissionId, submissionDate, feedback, fileURL, description, accumulatedPoints, assignedToProject);
        this.ownedByGroup = ownedByGroup;
    }

    public Group getOwnedByGroup() {
        return ownedByGroup;
    }

    public void setOwnedByGroup(Group ownedByGroup) {
        this.ownedByGroup = ownedByGroup;
    }  
}
