package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Service.CsvToDatabaseService;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;

import java.io.IOException;

@RequiredArgsConstructor
public class CsvToDatabaseController {
    private final CsvToDatabaseService csvToDatabaseService;
    public String uploadCsvToDatabase(String filePath) {
        try{
            return csvToDatabaseService.saveCsvToDatabase(filePath);
        } catch (CsvValidationException | IOException e) {
            return ("Error occurred while uploading CSV file: " + e.getMessage());
        }
    }
}
