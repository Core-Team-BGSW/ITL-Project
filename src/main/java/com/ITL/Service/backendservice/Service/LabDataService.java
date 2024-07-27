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

    public List<LabData> getLabDataByEntityNameWithLabDataFields(Map<String,Object> parameters) {
        return customLabDataRepo.findLabDataByEntityNameWithLabDataFields(parameters);
    }

    public List<LabData> getLabDataByEntityNameAndGB(String entityName, String gb) {
        return labDataRepo.findLabDataByEntityNameAndGb(entityName,gb);
    }
}
