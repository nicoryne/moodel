package com.g1appdev.Moodel.entity.group;

import java.util.Date;

import com.g1appdev.Moodel.entity.student.Student;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "group_student_assignations")
public class GroupStudentAssignation {
      
    @EmbeddedId
    private GroupStudentAssignationKey groupStudentId;

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name = "student_id", referencedColumnName = "studentId")
    private Student student;

    @ManyToOne
    @MapsId("groupId")
    @JoinColumn(name = "group_id", referencedColumnName = "groupId")
    private Group group;

    private Date assignedDate;

    public GroupStudentAssignation() {}

    public GroupStudentAssignation(GroupStudentAssignationKey groupStudentId, Student student, Group group,
            Date assignedDate) {
        this.groupStudentId = groupStudentId;
        this.student = student;
        this.group = group;
        this.assignedDate = assignedDate;
    }

    public GroupStudentAssignationKey getGroupStudentId() {
        return this.groupStudentId;
    }

    public void setGroupStudentId(GroupStudentAssignationKey groupStudentId) {
        this.groupStudentId = groupStudentId;
    }

    public Student getStudent() {
        return this.student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Group getGroup() {
        return this.group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public Date getAssignedDate() {
        return this.assignedDate;
    }

    public void setAssignedDate(Date assignedDate) {
        this.assignedDate = assignedDate;
    }

}
