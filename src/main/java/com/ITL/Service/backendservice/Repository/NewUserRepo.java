package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.NewUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewUserRepo extends MongoRepository<NewUser, String> {
    // Custom queries can be added here if needed
}
