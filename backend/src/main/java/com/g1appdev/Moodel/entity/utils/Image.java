package com.g1appdev.Moodel.entity.utils;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Image {

    @Id
    @GeneratedValue
    Long id;

    @Lob
    byte[] content;

    String name;

    String location;


    public Image() {}
        
    public Image(byte[] content, String name, String location) {
        this.content = content;
        this.name = name;
    }

    public Image(String name, String location) {
        this.name = name;
        this.location = location;
    }


    public Long getId() {
        return this.id;
    }

    public byte[] getContent() {
        return this.content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    
}
