package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.LabquestionResponse;
import com.ITL.Service.backendservice.Repository.ConsolidateResponseRepository;
//import com.ITL.Service.backendservice.Repository.ConsolidatedResponse;
import com.ITL.Service.backendservice.Model.ConsolidatedResponse;
import com.ITL.Service.backendservice.Repository.LabquestionRepository;
import com.ITL.Service.backendservice.Repository.LabquestionresponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LabquestionresponseService {
    @Autowired
    private LabquestionresponseRepository responseRepository; // Repository for the Response model
    @Autowired
    private LabquestionRepository questionRepository;
    @Autowired
    private ConsolidateResponseRepository consolidateResponseRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    public List<LabquestionResponse> saveResponses(List<LabquestionResponse> responses) {
        // Validate if question IDs exist in the QuestionRepository
        for (LabquestionResponse response : responses) {
//            if (!questionRepository.existsById(response.getQuestionId())) {
//                throw new IllegalArgumentException("Invalid Question ID: " + response.getQuestionId());
//            }
        }
        // Save all responses in the repository
        return responseRepository.saveAll(responses);
    }
    public Map<String, Object> saveConsolidatedResponses(List<LabquestionResponse> newResponses) {
        // Delete existing responses for the provided question IDs
        for (LabquestionResponse response : newResponses) {
            String questionKey = "questionId" + String.valueOf(response.getQuestionId());

            // Delete old responses by questionId
//            responseRepository.deleteByQuestionId(questionKey);
        }

        // Save the new responses
//        responseRepository.saveAll(newResponses);

        // Generate consolidated response map from the updated database
        List<LabquestionResponse> allResponses = responseRepository.findAll();
        Map<String, Object> consolidatedMap = new HashMap<>();
        for (LabquestionResponse response : newResponses) {
            String questionKey = "questionId" + response.getQuestionId();
//            if (consolidatedMap.containsKey(questionKey)) {
            consolidatedMap.put(questionKey, getResponseValue(response));

        }
        ConsolidatedResponse consolidatedResponse = new ConsolidatedResponse();
        consolidatedResponse.setResponseData(consolidatedMap);
        consolidateResponseRepository.save(consolidatedResponse);
        return consolidatedMap;
    }

    private Object getResponseValue(LabquestionResponse response) {
        // Dynamically determine which field has a value in the Response object
        if (response.getHeadCount() != null) return response.getHeadCount();
        if (response.getItDevice() != null) return response.getItDevice();
        if (response.getDependancy() != null) return response.getDependancy();
        if (response.getWan() != null) return response.getWan();
        if (response.getTest() != null) return response.getTest();
        if (response.getDowntime() != null) return response.getDowntime();
        if (response.getCriticalTest() != null) return response.getCriticalTest();
        if (response.getTrial() != null) return response.getTrial();
        if (response.getLan() != null) return response.getLan();
        if (response.getConfidentiality() != null) return response.getConfidentiality();
        return null;
    }
}
