package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.FileData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FileDataRepo extends MongoRepository<FileData,String> {
}
