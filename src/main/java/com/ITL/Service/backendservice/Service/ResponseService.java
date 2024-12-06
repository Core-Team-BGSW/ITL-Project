package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.ConsolidatedResponse;
import com.ITL.Service.backendservice.Model.Response;
import com.ITL.Service.backendservice.Repository.ConsolidateResponseRepository;
import com.ITL.Service.backendservice.Repository.QuestionRepository;
import com.ITL.Service.backendservice.Repository.ResponseRepository;
import com.ITL.Service.backendservice.Model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ResponseService {
    @Autowired
    private ResponseRepository responseRepository; // Repository for the Response model
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private ConsolidateResponseRepository consolidateResponseRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    /**
     * Save a list of responses.
     * @param responses List of responses to save.
     * @return List of saved responses.
     */
    public List<Response> saveResponses(List<Response> responses) {
        // Validate if question IDs exist in the QuestionRepository
        for (Response response : responses) {
//            if (!questionRepository.existsById(response.getQuestionId())) {
//                throw new IllegalArgumentException("Invalid Question ID: " + response.getQuestionId());
//            }
        }
        // Save all responses in the repository
        return responseRepository.saveAll(responses);
    }

    /**
     * Get all responses mapped by question ID.
     * @return A map of question IDs and their responses.
     */
    public Map<String, Object> saveConsolidatedResponses(List<Response> newResponses) {
        // Delete existing responses for the provided question IDs
        for (Response response : newResponses) {
            String questionKey = "questionId" + String.valueOf(response.getQuestionId());

            // Delete old responses by questionId
            responseRepository.deleteByQuestionId(questionKey);
        }

        // Save the new responses
        responseRepository.saveAll(newResponses);

        // Generate consolidated response map from the updated database
        List<Response> allResponses = responseRepository.findAll();
        Map<String, Object> consolidatedMap = new HashMap<>();
        for (Response response : newResponses) {
            String questionKey = "questionId" + response.getQuestionId();
//            if (consolidatedMap.containsKey(questionKey)) {
                consolidatedMap.put(questionKey, getResponseValue(response));

        }
//        mongoTemplate.save(consolidatedResponses, "consolidatedResponses");
//
//        return consolidatedResponses;
//        ConsolidatedResponse existingResponse = consolidateResponseRepository.findById("unique_consolidated_response_id").orElse(null);
//        if (existingResponse != null && existingResponse.getResponseData().equals(consolidatedMap)) {
//            return consolidatedMap; // Avoid saving duplicate data
//        }
        ConsolidatedResponse consolidatedResponse = new ConsolidatedResponse();
        consolidatedResponse.setResponseData(consolidatedMap);
        consolidateResponseRepository.save(consolidatedResponse);
        return consolidatedMap;
    }

    private Object getResponseValue(Response response) {
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


