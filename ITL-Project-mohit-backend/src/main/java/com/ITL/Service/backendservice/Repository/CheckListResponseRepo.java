package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.CheckListResponse;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckListResponseRepo extends MongoRepository<CheckListResponse, String> {
    // You can add custom query methods if needed
}