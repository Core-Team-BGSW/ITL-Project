package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.Entity;
import com.ITL.Service.backendservice.Model.LabData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableMongoRepositories
public interface LabDataRepo extends MongoRepository<LabData,String>,CustomLabDataRepo {
    @Query("{'entityName' :  ?0, 'floor' : ?1}")
    List<LabData> findLabDataByEntityNameAndFloor(String entityName, String floor);

    @Query("{'entityName' :  ?0, 'country' :  ?1}")
    List<LabData> findLabDataByEntityNameAndCountry(String entityName, String country);
}
