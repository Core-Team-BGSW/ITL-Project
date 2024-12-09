package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.Labquestion;
import com.ITL.Service.backendservice.Service.LabquestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class LabquestionController {
    @Autowired
    private LabquestionService labquestionService;

    public ResponseEntity<Labquestion> addQuestion(@RequestBody Labquestion question) {
        Labquestion savedQuestion = labquestionService.saveQuestion(question);
        return ResponseEntity.ok(savedQuestion);
    }

    // Save multiple questions
    @PostMapping("/bulk")
    public ResponseEntity<List<Labquestion>> addQuestions(@RequestBody List<Labquestion> questions) {
        List<Labquestion> savedQuestions = labquestionService.saveAllQuestions(questions);
        return ResponseEntity.ok(savedQuestions);
    }

    //     Get all questions
    @GetMapping
    public ResponseEntity<List<Labquestion>> getAllQuestions() {
        return ResponseEntity.ok(labquestionService.getAllQuestions());

    }

}
