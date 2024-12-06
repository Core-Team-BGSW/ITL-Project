package com.ITL.Service.backendservice.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class FileService {
    private static final Logger logger = LoggerFactory.getLogger(FileService.class);
    public void deleteCsvFile(Path deletePath) {
        try {
            Files.delete(deletePath);
            logger.info("File deleted Successfully");
            ResponseEntity.ok("File deleted successfully: " + deletePath);
        } catch (IOException e) {
            logger.info("File is not present in the System");
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("File is not present in the system.");
        }
    }
}
