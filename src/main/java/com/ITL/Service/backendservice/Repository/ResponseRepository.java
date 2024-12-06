package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.Response;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ResponseRepository extends MongoRepository<Response, String> {
    // Add custom queries if needed
    void deleteByQuestionId(String questionId);
}
