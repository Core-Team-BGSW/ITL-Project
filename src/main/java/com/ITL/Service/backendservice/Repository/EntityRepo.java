package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.Entity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@EnableMongoRepositories
public interface EntityRepo extends MongoRepository<Entity,String> {
    Optional<Entity> findByEntityName(String name);
}
