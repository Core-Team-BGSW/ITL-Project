package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.FormAnswer;
import com.ITL.Service.backendservice.Repository.FormAnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FormAnswerService {
    @Autowired
    private FormAnswerRepository formAnswerRepository;
    // Save form data
    public FormAnswer saveFormAnswer(FormAnswer formAnswer) {
        return formAnswerRepository.save(formAnswer);
    }

    // Fetch form data by ID
    public
    Optional<FormAnswer> getFormAnswerById(String id) {
        return formAnswerRepository.findById(id);
    }
}
