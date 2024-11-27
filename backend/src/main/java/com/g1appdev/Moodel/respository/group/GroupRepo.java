package com.g1appdev.Moodel.respository.group;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g1appdev.Moodel.entity.group.Group;

@Repository
public interface GroupRepo extends JpaRepository<Group, Integer>{

    public Group findByGroupNumber(int groupNumber);

}
