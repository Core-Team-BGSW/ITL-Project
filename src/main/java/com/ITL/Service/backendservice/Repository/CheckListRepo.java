package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.CheckList;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckListRepo extends MongoRepository<CheckList, Integer> {
}
