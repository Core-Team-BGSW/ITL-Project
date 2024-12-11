package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.Entity;
import com.ITL.Service.backendservice.Model.LabData;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableMongoRepositories
public interface EntityRepo extends MongoRepository<Entity,String>,CustomEntityDataRepo {

    @Query("{'entityName':  ?0, 'country' :  ?1}")
    List<LabData> findLabDataByEntityNameAndCountry(String entityName, String country);
    Entity findByEntityName(String name);
    Entity findByLocationCodeAndEntityName(String locationCode, String entityName);

    @Query("{ 'labDataList._id' : ?0 }")
    Entity findByLabDataId(ObjectId labDataId);
    List<Entity> findAllByEntityName(String name);

    Entity findByEntityNameAndLocationCode(String entityName, String locationCode);
}
