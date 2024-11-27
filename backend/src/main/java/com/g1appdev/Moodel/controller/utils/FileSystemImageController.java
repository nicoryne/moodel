package com.g1appdev.Moodel.controller.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.g1appdev.Moodel.service.utils.FileLocationService;

@RestController
@RequestMapping("file-system")
public class FileSystemImageController {
    
    @Autowired
    FileLocationService flservice;

    @PostMapping("/image")
    Long uploadImage(@RequestParam MultipartFile image) throws Exception {
        return flservice.save(image.getBytes(), image.getOriginalFilename());
    }

    @GetMapping(value = "/image/{imageId}", produces = MediaType.IMAGE_JPEG_VALUE) 
    FileSystemResource downloadImage(@PathVariable Long imageId) throws Exception {
        return flservice.find(imageId);
    }

    
}
