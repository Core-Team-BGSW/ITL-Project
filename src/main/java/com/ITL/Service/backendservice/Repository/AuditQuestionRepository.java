package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.AuditQuestions;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AuditQuestionRepository extends MongoRepository<AuditQuestions, String> {
}
