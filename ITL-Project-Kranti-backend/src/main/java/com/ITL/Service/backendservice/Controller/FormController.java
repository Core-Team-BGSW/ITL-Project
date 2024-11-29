package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.LabFormData;
import com.ITL.Service.backendservice.Service.FormDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("boschLabs/form")
@RequiredArgsConstructor
public class FormController {
   private final FormDataService formDataService;

    @PostMapping("/submit")
    public ResponseEntity<String> submitForm(@RequestBody LabFormData labFormData)
   {
       formDataService.saveFormData(labFormData);
       return ResponseEntity.ok("The form data is saved successfully");
   }
}
