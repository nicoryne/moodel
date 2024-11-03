package com.g1appdev.Moodel.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
<<<<<<< HEAD

import jakarta.persistence.CascadeType;
=======
import com.fasterxml.jackson.annotation.JsonManagedReference;

>>>>>>> 15b880722b3e8e94892afaf32930d2ffc1b8dd65
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

@Entity
@Table(name="students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int studentId;

    private String lastName;
    private String firstName;
    private Date birthDate;
    private int age;
    private String password;
    private String email;
    private String phoneNumber;
    private Date enrollmentDate;
    private String address;

<<<<<<< HEAD
    @OneToMany(mappedBy = "student")
    @JsonIgnore
    private Set<StudentCourseEnrollment> courseEnrollments = new HashSet<>();
=======
    
    @ManyToMany
    @JoinTable(
        name = "studentCourseEnrollment",
        joinColumns = @JoinColumn(name = "studentId"),
        inverseJoinColumns = @JoinColumn(name = "courseId")
    )
    @JsonManagedReference
    private Set<Course> enrolledCourses = new HashSet<>();
>>>>>>> 15b880722b3e8e94892afaf32930d2ffc1b8dd65

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "student", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<IndividualSubmissions> subs;

    public Student() {}

<<<<<<< HEAD
    public Student(String lastName, String firstName, Date birthDate, int age, String password, 
                   String email, String phoneNumber, Date enrollmentDate, String address) {
=======
    public Student(String lastName, String firstName, Date birthDate, int age, String password, String email, String phoneNumber, Date enrollmentDate, String address) {
>>>>>>> 15b880722b3e8e94892afaf32930d2ffc1b8dd65
        this.lastName = lastName;
        this.firstName = firstName;
        this.birthDate = birthDate;
        this.age = age;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.enrollmentDate = enrollmentDate;
        this.address = address;
    }

    public Set<Course> getEnrolledCourses() {
        return enrolledCourses;
    }

    public int getStudentId() {
        return studentId;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Date getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(Date enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
<<<<<<< HEAD

    public Set<StudentCourseEnrollment> getCourseEnrollments() {
        return courseEnrollments;
    }

    public void setCourseEnrollments(Set<StudentCourseEnrollment> courseEnrollments) {
        this.courseEnrollments = courseEnrollments;
    }
=======
>>>>>>> 15b880722b3e8e94892afaf32930d2ffc1b8dd65
}
