package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.AuditResponseFinal;
import com.ITL.Service.backendservice.Model.AuditQuestions;
import com.ITL.Service.backendservice.Model.AuditResponse;
import com.ITL.Service.backendservice.Repository.AuditQuestionRepository;
import com.ITL.Service.backendservice.Repository.AuditResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditService {

    @Autowired
    private AuditResponseRepository questionRepository;


    @Autowired
    private AuditQuestionRepository auditQuestionRepository;

    public List<AuditQuestions> getAllQuestions() {
        return auditQuestionRepository.findAll();
    }

    public List<AuditQuestions> saveQuestion(List<AuditQuestions> question) {
        return auditQuestionRepository.saveAll(question);
    }


    public AuditResponseFinal saveUserResponses(AuditResponseFinal auditResponseFinal) {
        return questionRepository.save(auditResponseFinal);
    }

    public List<AuditResponseFinal> getAllUserResponses() {
        return questionRepository.findAll();
    }

    public AuditResponseFinal getResponsesByUserId(String userId) {
        return questionRepository.findByUserId(userId);
    }

    public List<AuditResponse> getResponsesByQuestionId(String questionId) {
        List<AuditResponseFinal> allResponses = questionRepository.findAll();
        return allResponses.stream()
                .flatMap(response -> response.getResponses().stream())
                .filter(ans -> questionId.equals(ans.getQuestionId()))
                .toList();
    }
}
