package com.g1appdev.Moodel.service.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    public FileStorageService(@Value("${file.storage.location}") String fileStorageLocation) {
        this.fileStorageLocation = Paths.get(fileStorageLocation).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not create storage directory", e);
        }
    }

    public String storeFile(MultipartFile file) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        System.out.println("File Storage Location: " + fileStorageLocation);
        System.out.println("File Name: " + fileName);

        try {
            if (fileName.contains("..")) {
                throw new RuntimeException("Invalid file path");
            }

            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation);

            return fileName;
        } catch (IOException e) {
            throw new RuntimeException("Could not store file " + fileName, e);
        }
    }

    public Path loadFile(String baseFileName) {
        List<Path> matchingFiles = findFile(baseFileName);

        if(matchingFiles.isEmpty()) {
            throw new RuntimeException("No file found with base name: " + baseFileName);
        }

        return matchingFiles.get(0);
    }

    public void deleteFile(String baseFileName) {
        List<Path> matchingFiles = findFile(baseFileName);
    
        if (matchingFiles.isEmpty()) {
            System.out.println("No file found to delete with base name: " + baseFileName);
            return;
        }
    
        matchingFiles.forEach(matchedFile -> {
            try {
                Files.delete(matchedFile);
                System.out.println("Deleted file: " + matchedFile);
            } catch (IOException e) {
                throw new RuntimeException("Could not delete file: " + matchedFile, e);
            }
        });
    }

    private List<Path> findFile(String baseFileName) {
        try {
            return Files.list(this.fileStorageLocation)
                .filter(path -> {
                    String fileName = path.getFileName().toString();
                    int dotIndex = fileName.lastIndexOf('.');
                    String fileBaseName = (dotIndex == -1) ? fileName : fileName.substring(0, dotIndex);
                    return fileBaseName.equals(baseFileName);
                })
                .toList();
        } catch (IOException e) {
            throw new RuntimeException("Failed to search for files with base name: " + baseFileName, e);
        }
    }
}
