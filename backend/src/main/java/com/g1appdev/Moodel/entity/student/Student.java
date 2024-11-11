package com.g1appdev.Moodel.entity.student;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.g1appdev.Moodel.entity.submissions.IndividualSubmissions;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int studentId;

    @Column(unique = true)
    private String email;

    private String lname;
    private String fname;
    private Date birthDate;
    private int age;
    private String password;
    private String phoneNumber;
    private String address;
    private Date createdAt;

    @OneToMany(mappedBy="student")
    @JsonIgnoreProperties("student")
    private Set<StudentCourseEnrollment> courseEnrollments = new HashSet<>();

    @OneToMany(mappedBy="ownedByStudent", cascade=CascadeType.ALL)
    @JsonIgnoreProperties("ownedByStudent")
    private Set<IndividualSubmissions> individualSubmissions = new HashSet<>();

    public Student() {}

    public Student(String lname, String fname, Date birthDate, int age, String password, 
                   String email, String phoneNumber, Date createdAt, String address) {
        this.lname = lname;
        this.fname = fname;
        this.birthDate = birthDate;
        this.age = age;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.createdAt = createdAt;
        this.address = address;
    }


    public int getStudentId() {
        return this.studentId;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLname() {
        return this.lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getFname() {
        return this.fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public Date getBirthDate() {
        return this.birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public int getAge() {
        return this.age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Set<StudentCourseEnrollment> getCourseEnrollments() {
        return this.courseEnrollments;
    }

    public void setCourseEnrollments(Set<StudentCourseEnrollment> courseEnrollments) {
        this.courseEnrollments = courseEnrollments;
    }

    public Set<IndividualSubmissions> getIndividualSubmissions() {
        return this.individualSubmissions;
    }

    public void setIndividualSubmissions(Set<IndividualSubmissions> individualSubmissions) {
        this.individualSubmissions = individualSubmissions;
    }
}