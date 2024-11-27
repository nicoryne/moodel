package com.g1appdev.Moodel.service.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.g1appdev.Moodel.entity.utils.Image;
import com.g1appdev.Moodel.respository.utils.FileSystemRepo;
import com.g1appdev.Moodel.respository.utils.ImageRepo;

@Service 
public class FileLocationService {
    
    @Autowired
    FileSystemRepo frepo;

    @Autowired
    ImageRepo irepo;

    public Long save(byte[] bytes, String imageName) throws Exception {
        String location = frepo.save(bytes, imageName);
        
        return irepo.save(new Image(imageName, location)).getId();
    }

    public FileSystemResource find(Long imageId) {
    Image image = irepo.findById(imageId)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

    return frepo.findInFileSystem(image.getLocation());
    }

}
