package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.LocationData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationDataRepo extends MongoRepository<LocationData,String> {
}
