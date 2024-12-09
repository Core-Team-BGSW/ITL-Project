package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.ConsolidatedResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConsolidateResponseRepository extends MongoRepository<ConsolidatedResponse, String> {

    ConsolidatedResponse findFirstByOrderByIdDesc();
}
