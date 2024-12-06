package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.FormAnswer;
import com.ITL.Service.backendservice.Service.FormAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/selfCheck")
public class SelfAuditController {
    @Autowired
    private FormAnswerService formAnswerService;

    // Save form data
    @PostMapping("/save")
    public FormAnswer saveForm(@RequestBody FormAnswer formData) {

        return formAnswerService.saveFormAnswer(formData);
    }

    // Fetch form data by ID
    @GetMapping("/fetch/{id}")
    public Optional<FormAnswer> fetchForm(@PathVariable String id) {

        return formAnswerService.getFormAnswerById(id);
    }
}
