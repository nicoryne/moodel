package com.g1appdev.Moodel.respository.utils;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g1appdev.Moodel.entity.utils.Image;

@Repository 
public interface ImageRepo extends JpaRepository<Image, Long> {

    
}
