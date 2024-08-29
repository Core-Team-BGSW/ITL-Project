package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.LabData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableMongoRepositories
public interface LabDataRepo extends MongoRepository<LabData,String>,CustomLabDataRepo {
    @Query("{'entityName' :  ?0, 'gb' :  ?1}")
    List<LabData> findLabDataByEntityNameAndGb(String entityName, String gb);
    @Query("{'locationCode' : ?0, 'entityName' :  ?1, 'gb':  ?2, 'labNo' : ?3, 'primary_lab_cord' : ?4}")
    LabData findLabDataByLocationCodeAndEntityNameAndGbAndLabNoAndPrimary_lab_cord(String locationCode, String entityName, String gb, String labNo,String primary_lab_cord);
}
