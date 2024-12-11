package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.Labquestion;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface LabquestionRepository extends MongoRepository<Labquestion, String> {
    // Additional query methods can be defined here if needed
//        Question findByQuestionId(String questionId);
    Optional<Labquestion> findByQuestionId(int questionId);

}
