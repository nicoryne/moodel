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

    public GroupSubmissions(Date submissionDate, String feedback, String fileURL, String description, int accumulatedPoints, Group group, Projects project) {
        super(submissionDate, feedback, fileURL, description, accumulatedPoints, project);
        this.ownedByGroup = group;
    }

    public Group getGroup() {
        return this.ownedByGroup;
    }

    public void setGroup(Group group) {
        this.ownedByGroup = group;
    }  
}
