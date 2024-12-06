package com.ITL.Service.backendservice.Controller;


import com.ITL.Service.backendservice.Model.Question;
import com.ITL.Service.backendservice.Service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        Question savedQuestion = questionService.saveQuestion(question);
        return ResponseEntity.ok(savedQuestion);
    }

    // Save multiple questions
    @PostMapping("/bulk")
    public ResponseEntity<List<Question>> addQuestions(@RequestBody List<Question> questions) {
        List<Question> savedQuestions = questionService.saveAllQuestions(questions);
        return ResponseEntity.ok(savedQuestions);
    }

//     Get all questions
    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());

    }

}
