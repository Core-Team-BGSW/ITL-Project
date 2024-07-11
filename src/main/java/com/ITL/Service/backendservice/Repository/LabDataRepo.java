package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.LabData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabDataRepo extends MongoRepository<LabData,String> {
    List<LabData> findByCountryAndRegionAndLocationCode(String country, String region,String locationCode);

    List<LabData> findByCountryAndRegion(String country, String region);
}
