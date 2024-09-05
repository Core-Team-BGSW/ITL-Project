package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.DTO.LabDataWithEntityDTO;
import com.ITL.Service.backendservice.Model.Entity;
import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Repository.CustomLabDataRepoImpl;
import com.ITL.Service.backendservice.Repository.LabDataRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LabDataService {
    private final LabDataRepo labDataRepo;
    private final CustomLabDataRepoImpl customLabDataRepo;
    private final MongoTemplate mongoTemplate;

    public List<LabData> getLabDataByEntityNameWithLabDataFields(Map<String,Object> parameters) {
        return customLabDataRepo.findLabDataByEntityNameWithLabDataFields(parameters);
    }

    public List<LabData> getLabDataByEntityNameAndGB(String entityName, String gb) {
        return labDataRepo.findLabDataByEntityNameAndGb(entityName,gb);
    }

    public ResponseEntity<String> deleteLabDataByPrimaryLabCoordinator(String primaryLabCord) {
        return customLabDataRepo.deleteByPrimaryLabCoordinator(primaryLabCord);
    }

    public List<LabData> getAllLabsData() {
        return labDataRepo.findAll();
    }

    public List<LabDataWithEntityDTO> getAllLabDataWithEntities() {
        TypedAggregation<LabData> aggregation = Aggregation.newAggregation(
                LabData.class,
                Aggregation.lookup("entity", "id", "labDataList", "entityData"),
                Aggregation.unwind("entityData", true),
                Aggregation.project("seqId","gb","local_itl","local_itl_proxy","dh","kam","dep_name","building","entityName","locationCode","floor","labNo","primary_lab_cord","secondary_lab_cord","cost_center","kind_of_lab","purpose_of_lab","description","new_equipment","shared_lab","acl_req","green_ports","yellow_ports","red_ports")
                        .and("entityData.region").as("region")
                        .and("entityData.country").as("country")
                        .and("entityData.location").as("location")
        );
        AggregationResults<LabDataWithEntityDTO> res = mongoTemplate.aggregate(aggregation, LabDataWithEntityDTO.class, LabDataWithEntityDTO.class);
        return res.getMappedResults();
    }
}
