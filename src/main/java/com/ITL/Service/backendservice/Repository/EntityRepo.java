package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.Entity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EntityRepo extends MongoRepository<Entity,String> {
}
