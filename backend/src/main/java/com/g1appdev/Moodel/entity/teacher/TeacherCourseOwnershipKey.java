package com.g1appdev.Moodel.entity.teacher;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class TeacherCourseOwnershipKey implements Serializable {

    @Column(name="teacherId")
    private int teacherId;

    @Column(name="courseId")
    private int courseId;
    
    public TeacherCourseOwnershipKey() {}

    public TeacherCourseOwnershipKey(int teacherId, int courseId) {
        this.teacherId = teacherId;
        this.courseId = courseId;
    }


    public int getTeacherId() {
        return this.teacherId;
    }

    public void setTeacherId(int teacherId) {
        this.teacherId = teacherId;
    }

    public int getCourseId() {
        return this.courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TeacherCourseOwnershipKey that = (TeacherCourseOwnershipKey) o;
        return teacherId == that.teacherId &&
            courseId == that.courseId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(teacherId, courseId);
    }


}
