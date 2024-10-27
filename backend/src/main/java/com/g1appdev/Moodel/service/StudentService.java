package com.g1appdev.Moodel.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.Course;
import com.g1appdev.Moodel.entity.Student;
import com.g1appdev.Moodel.respository.CourseRepo;
import com.g1appdev.Moodel.respository.StudentRepo;

@Service
public class StudentService {

    @Autowired
    StudentRepo studentRepo;

    @Autowired
    CourseRepo courseRepo;

    public StudentService() {
        super();
    }

    // CREATE
    public Student postStudentRecord(Student student) {
        return studentRepo.save(student);
    }

    // READ
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    // UPDATE
    public Student updateStudentDetails(int id, Student newStudentDetails) {
        Student student = studentRepo.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Student " + id + " not found"));

        student.setFirstName(newStudentDetails.getFirstName());
        student.setLastName(newStudentDetails.getLastName());
        student.setBirthDate(newStudentDetails.getBirthDate());
        student.setAge(newStudentDetails.getAge());
        student.setPassword(newStudentDetails.getPassword());
        student.setEmail(newStudentDetails.getEmail());
        student.setPhoneNumber(newStudentDetails.getPhoneNumber());
        student.setEnrollmentDate(newStudentDetails.getEnrollmentDate());
        student.setAddress(newStudentDetails.getAddress());

        return studentRepo.save(student);
    }

    public Student enrollInCourse(int studentId, int courseId) {
        Student student = studentRepo.findById(studentId)
            .orElseThrow(() -> new NoSuchElementException("Student not found"));
        Course course = courseRepo.findById(courseId)
            .orElseThrow(() -> new NoSuchElementException("Course not found"));

        student.getEnrolledCourses().add(course);
        return studentRepo.save(student);
    }

    // DELETE
    public String deleteStudent(int id) {
        if (!studentRepo.existsById(id)) {
            return "Student record with ID " + id + " was NOT found.";
        }

        studentRepo.deleteById(id);
        return "Student record with ID " + id + " has been successfully deleted.";
    }
}
