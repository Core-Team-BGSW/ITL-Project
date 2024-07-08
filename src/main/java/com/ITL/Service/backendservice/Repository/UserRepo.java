package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableMongoRepositories
public interface UserRepo extends MongoRepository<User,String> {
    List<User> findByLocationCode(String locationCode);
}

