package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.CheckList;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CheckListRepo extends MongoRepository<CheckList, String> {

    // Custom query method to find CheckList by questionId
    CheckList findByQuestionId(Integer questionId);  // This will query the database based on questionId
}
