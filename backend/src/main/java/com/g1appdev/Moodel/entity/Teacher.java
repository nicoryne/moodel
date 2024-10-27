package com.g1appdev.Moodel.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
@Table(name="Teachers")
public class Teacher {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int teacherId;

    private String lname;
    private String fname;
    private Date birthDate;
    private int age;
    private String password;
    private String email;
    private String phoneNumber;
    private Date hireDate;

    @OneToMany(mappedBy = "teacher")
    private Set<TeacherCourseOwnership> ownedCourses;
    
    public Teacher() {}

    public Teacher(String lname, String fname, Date birthDate, int age, String password, String email, String phoneNumber, Date hireDate) {
        this.lname = lname;
        this.fname = fname;
        this.birthDate = birthDate;
        this.age = age;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.hireDate = hireDate;
        this.ownedCourses = new HashSet<>();
    }

    public int getTeacherId() {
        return this.teacherId;
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

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Date getHireDate() {
        return this.hireDate;
    }

    public void setHireDate(Date hireDate) {
        this.hireDate = hireDate;
    }

    public Set<TeacherCourseOwnership> getOwnedCourses() {
        return this.ownedCourses;
    }

}
