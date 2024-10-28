package com.g1appdev.Moodel.entity;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.Objects;

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
    @JsonIgnoreProperties("teacher")
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


    // public Teacher(int teacherId, String lname, String fname, Date birthDate, int age, String password, String email, String phoneNumber, Date hireDate, Set<TeacherCourseOwnership> ownedCourses) {
    //     this.teacherId = teacherId;
    //     this.lname = lname;
    //     this.fname = fname;
    //     this.birthDate = birthDate;
    //     this.age = age;
    //     this.password = password;
    //     this.email = email;
    //     this.phoneNumber = phoneNumber;
    //     this.hireDate = hireDate;
    //     this.ownedCourses = ownedCourses;
    // }
    // public void setTeacherId(int teacherId) {
    //     this.teacherId = teacherId;
    // }
    // public void setOwnedCourses(Set<TeacherCourseOwnership> ownedCourses) {
    //     this.ownedCourses = ownedCourses;
    // }

    // public Teacher teacherId(int teacherId) {
    //     setTeacherId(teacherId);
    //     return this;
    // }

    // public Teacher lname(String lname) {
    //     setLname(lname);
    //     return this;
    // }

    // public Teacher fname(String fname) {
    //     setFname(fname);
    //     return this;
    // }

    // public Teacher birthDate(Date birthDate) {
    //     setBirthDate(birthDate);
    //     return this;
    // }

    // public Teacher age(int age) {
    //     setAge(age);
    //     return this;
    // }

    // public Teacher password(String password) {
    //     setPassword(password);
    //     return this;
    // }

    // public Teacher email(String email) {
    //     setEmail(email);
    //     return this;
    // }

    // public Teacher phoneNumber(String phoneNumber) {
    //     setPhoneNumber(phoneNumber);
    //     return this;
    // }

    // public Teacher hireDate(Date hireDate) {
    //     setHireDate(hireDate);
    //     return this;
    // }

    // public Teacher ownedCourses(Set<TeacherCourseOwnership> ownedCourses) {
    //     setOwnedCourses(ownedCourses);
    //     return this;
    // }

    // @Override
    // public String toString() {
    //     return "{" +
    //         " teacherId='" + getTeacherId() + "'" +
    //         ", lname='" + getLname() + "'" +
    //         ", fname='" + getFname() + "'" +
    //         ", birthDate='" + getBirthDate() + "'" +
    //         ", age='" + getAge() + "'" +
    //         ", password='" + getPassword() + "'" +
    //         ", email='" + getEmail() + "'" +
    //         ", phoneNumber='" + getPhoneNumber() + "'" +
    //         ", hireDate='" + getHireDate() + "'" +
    //         ", ownedCourses='" + getOwnedCourses() + "'" +
    //         "}";
    // }

    // @Override
    // public Collection<? extends GrantedAuthority> getAuthorities() {
    //     return List.of();
    // }

    // @Override
    // public String getUsername() {
    //     return email;
    // }

    // @Override
    // public boolean isAccountNonExpired() {
    //     return true;
    // }

    // @Override
    // public boolean isAccountNonLocked() {
    //     return true;
    // }

    // @Override
    // public boolean isCredentialsNonExpired() {
    //     return true;
    // }

    // @Override
    // public boolean isEnabled() {
    //     return true;
    // }
    

}
