package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.LabquestionResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LabquestionresponseRepository extends MongoRepository<LabquestionResponse, String> {
    // Add custom queries if needed
    void deleteByQuestionId(String questionId);
}
