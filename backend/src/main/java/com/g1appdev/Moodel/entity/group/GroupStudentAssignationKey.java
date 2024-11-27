package com.g1appdev.Moodel.entity.group;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class GroupStudentAssignationKey implements Serializable{
    
    @Column(name = "student_id")
    private int studentId;

    @Column(name = "group_id")
    private int groupId;

    public GroupStudentAssignationKey() {}

    public GroupStudentAssignationKey(int groupId, int studentId) {
        this.groupId = groupId;
        this.studentId = studentId;
    }

    public int getStudentId() {
        return this.studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public int getGroupId() {
        return this.groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GroupStudentAssignationKey that = (GroupStudentAssignationKey) o;
        return this.groupId == that.groupId && this.studentId == that.studentId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(groupId, studentId);
    }

}
