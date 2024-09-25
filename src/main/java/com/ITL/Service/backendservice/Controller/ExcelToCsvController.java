package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Service.ExcelToCsvService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/upload")
@RequiredArgsConstructor
public class ExcelToCsvController {
    private final ExcelToCsvService excelToCsvService;

    @PostMapping("/convert-excel-to-csv")
    public ResponseEntity<String> convert(@RequestParam("file") MultipartFile file) {
        System.out.println("HI..");
        return excelToCsvService.excelToCsvConverter(file);
    }
}

