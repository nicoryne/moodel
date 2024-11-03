package com.g1appdev.Moodel.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g1appdev.Moodel.entity.Course;
import com.g1appdev.Moodel.entity.Student;
import com.g1appdev.Moodel.respository.CourseRepo;
<<<<<<< HEAD
import com.g1appdev.Moodel.respository.StudentCourseEnrollmentRepo;
=======
>>>>>>> 15b880722b3e8e94892afaf32930d2ffc1b8dd65
import com.g1appdev.Moodel.respository.StudentRepo;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private CourseRepo courseRepo;

<<<<<<< HEAD
    @Autowired
    private StudentCourseEnrollmentRepo enrollmentRepo;

=======
>>>>>>> 15b880722b3e8e94892afaf32930d2ffc1b8dd65
    public StudentService() {
        super();
    }

    // CREATE
    public Student postStudentRecord(Student student) {
        return studentRepo.save(student);
    }

    // READ ALL
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

<<<<<<< HEAD
    // ENROLL STUDENT IN A COURSE
    public StudentCourseEnrollment enrollInCourse(int studentId, int courseId) {
=======
    public Student enrollInCourse(int studentId, int courseId) {
>>>>>>> 15b880722b3e8e94892afaf32930d2ffc1b8dd65
        Student student = studentRepo.findById(studentId)
            .orElseThrow(() -> new NoSuchElementException("Student not found"));
        Course course = courseRepo.findById(courseId)
            .orElseThrow(() -> new NoSuchElementException("Course not found"));

<<<<<<< HEAD
        StudentCourseEnrollmentKey enrollmentKey = new StudentCourseEnrollmentKey(studentId, courseId);
        if (enrollmentRepo.existsById(enrollmentKey)) {
            throw new IllegalStateException("Student is already enrolled in this course.");
        }

        StudentCourseEnrollment enrollment = new StudentCourseEnrollment(enrollmentKey, student, course, new java.util.Date());
        return enrollmentRepo.save(enrollment);
=======
        student.getEnrolledCourses().add(course);
        return studentRepo.save(student);
>>>>>>> 15b880722b3e8e94892afaf32930d2ffc1b8dd65
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
