package com.g1appdev.Moodel.service.student;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.course.Course;
import com.g1appdev.Moodel.entity.student.Student;
import com.g1appdev.Moodel.entity.student.StudentCourseEnrollment;
import com.g1appdev.Moodel.entity.student.StudentCourseEnrollmentKey;
import com.g1appdev.Moodel.respository.course.CourseRepo;
import com.g1appdev.Moodel.respository.student.StudentCourseEnrollmentRepo;
import com.g1appdev.Moodel.respository.student.StudentRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class StudentCourseEnrollmentService {

    @Autowired
    private StudentCourseEnrollmentRepo scerepo;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private CourseRepo courseRepo;

    //#################
    // CREATE FUNCTIONS
    //#################

    public StudentCourseEnrollment postStudentCourseEnrollment(StudentCourseEnrollment enrollment) {
        int studentId = enrollment.getStudentCourseId().getStudentId();
        int courseId = enrollment.getStudentCourseId().getCourseId();

        Student student = studentRepo.findById(studentId)
            .orElseThrow(() -> new EntityNotFoundException("🔴 ERROR: Student record with ID " + studentId + " was NOT found."));

        Course course = courseRepo.findById(courseId)
            .orElseThrow(() -> new EntityNotFoundException("🔴 ERROR: Course record with ID " + courseId + " was NOT found."));

        enrollment.setStudent(student);
        enrollment.setCourse(course);
        
        return scerepo.save(enrollment);
    }

    //#################
    // READ FUNCTIONS
    //#################

    public List<StudentCourseEnrollment> getAllEnrollments() {
        return scerepo.findAll();
    }

    public List<StudentCourseEnrollment> getEnrollmentsByStudentId(int studentId) {
        return scerepo.findByStudent_StudentId(studentId);
    }

    public List<StudentCourseEnrollment> getEnrollmentsByCourseId(int courseId) {
        return scerepo.findByCourse_CourseId(courseId);
    }

    public List<StudentCourseEnrollment> getEnrollmentsByCreatedAt(Date createdAt) {
        return scerepo.findByCreatedAt(createdAt);
    }

    //#################
    // UPDATE FUNCTIONS
    //#################

    public StudentCourseEnrollment putStudentCourseEnrollment(StudentCourseEnrollment newEnrollment) {
        StudentCourseEnrollmentKey key = newEnrollment.getStudentCourseId();
        StudentCourseEnrollment enrollment = scerepo.findById(key)
            .orElseThrow(() -> new NoSuchElementException("🔴 ERROR: Enrollment record with ID " + key + " was NOT found."));

        enrollment.setCreatedAt(newEnrollment.getCreatedAt());
        enrollment.setIsVerified(newEnrollment.getIsVerified());

        return scerepo.save(enrollment);
    }

    //#################
    // DELETE FUNCTIONS
    //#################

    public String deleteStudentCourseEnrollment(StudentCourseEnrollmentKey key) {
        if (!scerepo.existsById(key)) {
            throw new NoSuchElementException("🔴 ERROR: Enrollment record with ID " + key + " was NOT found.");
        }

        scerepo.deleteById(key);
        return "✅ SUCCESS: Enrollment record with ID " + key + " has been successfully deleted.";
    }
}
