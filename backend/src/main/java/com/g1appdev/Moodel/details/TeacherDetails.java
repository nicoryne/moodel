/**
 * The `TeacherDetails` class implements the `UserDetails` interface in Java for handling teacher user
 * details in a Spring Security context.
 */
package com.g1appdev.Moodel.details;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.g1appdev.Moodel.entity.Teacher;

public class TeacherDetails implements UserDetails {

    private String username;
    
    private String password;

    private List<GrantedAuthority> authorities;

    public TeacherDetails(Teacher teacher) {
        this.username = teacher.getEmail();
        this.password = teacher.getPassword();
        this.authorities = List.of(teacher.getRoles().split(", "))
            .stream()
            .map(SimpleGrantedAuthority::new)
            .collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    
}
