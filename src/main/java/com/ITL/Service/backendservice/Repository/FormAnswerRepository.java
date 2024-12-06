package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.FormAnswer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FormAnswerRepository extends MongoRepository<FormAnswer, String> {}
