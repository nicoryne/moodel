package com.g1appdev.Moodel.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.g1appdev.Moodel.entity.Group;

public interface GroupRepo extends JpaRepository<Group, Integer>{
    public Group findByGroupNumber(int groupNumber);
}
