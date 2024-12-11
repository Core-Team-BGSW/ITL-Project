package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.LabFormData;
import com.ITL.Service.backendservice.Service.FormDataService;
import com.ITL.Service.backendservice.Utility.ExcelConverter;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("boschLabs/form")
@RequiredArgsConstructor
public class FormController {
   private final FormDataService formDataService;
   private final ExcelConverter excelConverter;

    @PostMapping("/submit")
    public ResponseEntity<String> submitForm(@RequestBody LabFormData labFormData) throws IOException, MessagingException {
       formDataService.saveFormData(labFormData);
       //excelConverter.createExcelFileFromLabData(labFormData);
       return ResponseEntity.ok("The form data is saved successfully");
   }
}
