package com.ITL.Service.backendservice.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class FileService {
    public void deleteCsvFile(Path deletePath) {
        try {
            Files.delete(deletePath);
            ResponseEntity.ok("File deleted successfully: " + deletePath);
        } catch (IOException e) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("File is not present in the system.");
        }
    }
}
