package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.LabData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabDataRepo extends MongoRepository<LabData,String> {
    List<LabData> findByCountryAndRegionAndLocationCode(String country, String region,String locationCode);

    List<LabData> findByCountryAndRegion(String country, String region);

    List<LabData> findByCountryAndLocationCodeAndEntity(String country, String locationCode, String entity);

    List<LabData> findByCountryAndLocationCodeAndEntityAndGb(String country, String locationCode, String entity, String gb);

    LabData findByBuildingAndLabNo(String building, String labNo);

    List<LabData> findByBuildingAndFloor(String building, String floor);

    LabData findByBuildingAndFloorAndLabNo(String building, String floor, String labNo);
}
