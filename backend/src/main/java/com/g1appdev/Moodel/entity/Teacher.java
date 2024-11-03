package com.g1appdev.Moodel.entity;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
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
    
    @Column(unique = true)
    private String email;
    
    private String phoneNumber;
    private String address;
    private Date hireDate;
    private String roles = "ROLE_USER";
   

    @OneToMany(mappedBy = "teacher")
    @JsonIgnoreProperties("teacher")
    private Set<TeacherCourseOwnership> ownedCourses = new HashSet<>();
    
    public Teacher() {}

    public Teacher(String lname, String fname, Date birthDate, int age, String password, String email, String phoneNumber, String address, Date hireDate) {
        this.lname = lname;
        this.fname = fname;
        this.birthDate = birthDate;
        this.age = age;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.hireDate = hireDate;
    }

    @Override
    public String toString() {
        return "{" +
            " teacherId='" + getTeacherId() + "'" +
            ", lname='" + getLname() + "'" +
            ", fname='" + getFname() + "'" +
            ", birthDate='" + getBirthDate() + "'" +
            ", age='" + getAge() + "'" +
            ", password='" + getPassword() + "'" +
            ", email='" + getEmail() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", hireDate='" + getHireDate() + "'" +
            ", ownedCourses='" + getOwnedCourses() + "'" +
            "}";
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

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public void setOwnedCourses(Set<TeacherCourseOwnership> ownedCourses) {
        this.ownedCourses = ownedCourses;
    }

    public String getRoles() {
        return this.roles;
    }
}
