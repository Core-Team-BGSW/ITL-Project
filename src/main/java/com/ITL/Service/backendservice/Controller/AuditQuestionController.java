package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.AuditResponseFinal;
import com.ITL.Service.backendservice.Model.AuditQuestions;
import com.ITL.Service.backendservice.Model.AuditResponse;
import com.ITL.Service.backendservice.Service.AuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/questionsAshraf")
public class AuditQuestionController {

    @Autowired
    private AuditService questionService;



    @GetMapping("/get")
    public List<AuditQuestions> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @PostMapping("/add")
    public List<AuditQuestions> addQuestion(@RequestBody List<AuditQuestions> question) {
        return questionService.saveQuestion(question);
    }

    @PostMapping("/save")
    public AuditResponseFinal saveResponses(@RequestBody AuditResponseFinal auditResponseFinal) {
        return questionService.saveUserResponses(auditResponseFinal);
    }

    @GetMapping("/getall")
    public List<AuditResponseFinal> getAllResponses() {
        return questionService.getAllUserResponses();
    }

    @GetMapping("/responses/user/{userId}")
    public AuditResponseFinal getResponsesByUserId(@PathVariable String userId) {
        return questionService.getResponsesByUserId(userId);
    }

    // New endpoint: Fetch all responses for a specific questionId
    @GetMapping("/responses/question/{questionId}")
    public List<AuditResponse> getResponsesByQuestionId(@PathVariable String questionId) {
        return questionService.getResponsesByQuestionId(questionId);
    }
}
