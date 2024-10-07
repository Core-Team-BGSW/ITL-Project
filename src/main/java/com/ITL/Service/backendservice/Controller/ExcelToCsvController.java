package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Service.CsvToDatabaseService;
import com.ITL.Service.backendservice.Service.ExcelToCsvService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/upload")
@RequiredArgsConstructor
public class ExcelToCsvController {
    private final ExcelToCsvService excelToCsvService;
    private final CsvToDatabaseService csvToDatabaseService;

    @PostMapping("/convert-excel-to-csv")
    public ResponseEntity<String> convert(@RequestParam("file") MultipartFile file) {
        // Define the path where the CSV will be saved
        String csvFilePath = "/home/iterl/uploads/" + file.getOriginalFilename() + ".csv";

        try {
            // Save the uploaded file to local storage
            File csvFile = new File(csvFilePath);
            file.transferTo(csvFile);

            // Convert the Excel file to CSV format (you need to implement this in ExcelToCsvService)
            excelToCsvService.excelToCsvConverter((MultipartFile) csvFile);

            // Process the CSV file and save data to the database
            String result = csvToDatabaseService.saveCsvToDatabase(csvFilePath);

            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving or processing file: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
