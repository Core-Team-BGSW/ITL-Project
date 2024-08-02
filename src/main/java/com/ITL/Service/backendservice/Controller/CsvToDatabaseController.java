package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Service.CsvToDatabaseService;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
public class CsvToDatabaseController {
    @Autowired
    private CsvToDatabaseService csvToDatabaseService;

    public String uploadCsvToDatabase(String filePath) {
        try{
            return csvToDatabaseService.saveCsvToDatabase(filePath);
        } catch (CsvValidationException | IOException e) {
            return ("Error occurred while uploading CSV file: " + e.getMessage());
        }
    }
}
