package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.Labquestion;
import com.ITL.Service.backendservice.Repository.LabquestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class LabquestionService {
    @Autowired
    private LabquestionRepository questionRepository;

    public Labquestion saveQuestion(Labquestion question) {
        return questionRepository.save(question);
    }

    public List<Labquestion> saveAllQuestions(List<Labquestion> questions) {
        return questionRepository.saveAll(questions);
    }

    public List<Labquestion> getAllQuestions() {
        return questionRepository.findAll();
    }
}
