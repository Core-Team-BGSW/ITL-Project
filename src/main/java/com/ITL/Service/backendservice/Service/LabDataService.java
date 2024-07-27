package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.Entity;
import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Repository.CustomLabDataRepoImpl;
import com.ITL.Service.backendservice.Repository.EntityRepo;
import com.ITL.Service.backendservice.Repository.LabDataRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LabDataService {
    private final LabDataRepo labDataRepo;
    private final CustomLabDataRepoImpl customLabDataRepo;
    public List<LabData> getLabDataByEntityNameAndFloor(String entityName,String floor) {
        return labDataRepo.findLabDataByEntityNameAndFloor(entityName, floor);
    }

    public List<LabData> getLabDataByEntityAndCountry(String entityName, String country) {
        return labDataRepo.findLabDataByEntityNameAndCountry(entityName,country);
    }

    public List<LabData> getLabDataByEntityNameCountryDepNameFloor(Map<String,Object> parameters) {
        return customLabDataRepo.findLabDataByEntityNameCountryDepNameFloor(parameters);
    }
}
