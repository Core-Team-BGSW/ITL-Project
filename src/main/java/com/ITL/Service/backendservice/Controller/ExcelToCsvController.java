package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Service.ExcelToCsvService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/upload")
@RequiredArgsConstructor
public class ExcelToCsvController {
    private final ExcelToCsvService excelToCsvService;

    @PostMapping("/convert-excel-to-csv")
    public ResponseEntity<String> convert(@RequestParam("file") MultipartFile file) throws IOException {
        return excelToCsvService.excelToCsvConverter(file);
    }
}


