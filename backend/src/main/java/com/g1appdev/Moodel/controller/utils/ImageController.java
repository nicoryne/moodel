package com.g1appdev.Moodel.controller.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.g1appdev.Moodel.entity.utils.Image;
import com.g1appdev.Moodel.respository.utils.ImageRepo;


@RestController 
public class ImageController {
    
    @Autowired 
    ImageRepo irepo;

    @PostMapping
    Long uploadImage(@RequestParam MultipartFile mutliPartImage) throws Exception {
        Image dbImage = new Image();
        dbImage.setName(mutliPartImage.getName());
        dbImage.setContent(mutliPartImage.getBytes());

        return irepo.save(dbImage).getId();
    }

    @GetMapping(value = "/image/{imageId}", produces = MediaType.IMAGE_JPEG_VALUE)
    Resource downloadImage(@PathVariable Long imageId) {
        byte[] image = irepo.findById(imageId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND))
        .getContent();

        return new ByteArrayResource(image);
    }
    
}
