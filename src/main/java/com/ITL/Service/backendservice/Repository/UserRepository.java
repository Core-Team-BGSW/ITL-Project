package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.Userform;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<Userform, String> {

}
