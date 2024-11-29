package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Service.CsvToDatabaseService;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
public class CsvToDatabaseController {
    private final CsvToDatabaseService csvToDatabaseService;
    public ResponseEntity<String> uploadCsvToDatabase(String filePath) {
        try{
            ResponseEntity<String> res = csvToDatabaseService.saveCsvToDatabase(filePath);
            return ResponseEntity.ok(res.toString());
        } catch (CsvValidationException | IOException e) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while inserting CSV to Database: " + e.getMessage());
        }
    }
}
