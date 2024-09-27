package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.DTO.LabDataWithEntityDTO;
import com.ITL.Service.backendservice.Model.Entity;
import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Repository.CustomLabDataRepoImpl;
import com.ITL.Service.backendservice.Repository.EntityRepo;
import com.ITL.Service.backendservice.Repository.LabDataRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LabDataService {
    private final LabDataRepo labDataRepo;
    private final CustomLabDataRepoImpl customLabDataRepo;
    private final MongoTemplate mongoTemplate;
    private final EntityRepo entityRepo;

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
//        TypedAggregation<LabData> aggregation = Aggregation.newAggregation(
//                LabData.class,
//                Aggregation.lookup("entity", "id", "labDataList", "entityData"),
//                Aggregation.unwind("entityData", true),
//                Aggregation.project("seqId","gb","local_itl","local_itl_proxy","dh","kam","dep_name","building","entityName","locationCode","floor","labNo","primary_lab_cord","secondary_lab_cord","cost_center","kind_of_lab","purpose_of_lab","description","new_equipment","shared_lab","acl_req","green_ports","yellow_ports","red_ports")
//                        .and("entityData.region").as("region")
//                        .and("entityData.country").as("country")
//                        .and("entityData.location").as("location")
//        );
//        AggregationResults<LabDataWithEntityDTO> res = mongoTemplate.aggregate(aggregation, LabDataWithEntityDTO.class, LabDataWithEntityDTO.class);
//        return res.getMappedResults();
        List<LabData> labDataList = labDataRepo.findAll();
        List<LabDataWithEntityDTO> labDataWithEntityDTOList = new ArrayList<>();
        for(LabData labData : labDataList) {
            LabDataWithEntityDTO labDataWithEntityDTO = convertToLabDataWithEntityDTO(labData);
            Entity entity = entityRepo.findByLabDataId(labData.getId());
            if (entity != null) {
                labDataWithEntityDTO.setRegion(entity.getRegion());
                labDataWithEntityDTO.setLocation(entity.getLocation());
                labDataWithEntityDTO.setCountry(entity.getCountry());
                labDataWithEntityDTOList.add(labDataWithEntityDTO);
            } else {
                labDataWithEntityDTO.setRegion("Unknown");  // or whatever default makes sense
                labDataWithEntityDTO.setLocation("Unknown");
                labDataWithEntityDTO.setCountry("Unknown");
            }
            labDataWithEntityDTOList.add(labDataWithEntityDTO);
        }
        return labDataWithEntityDTOList;
    }

    private LabDataWithEntityDTO convertToLabDataWithEntityDTO(LabData labData) {
        LabDataWithEntityDTO labDataWithEntityDTO = new LabDataWithEntityDTO();
        labDataWithEntityDTO.setId(labData.getId());
        labDataWithEntityDTO.setShared_lab(labData.getShared_lab());
        labDataWithEntityDTO.setPurpose_of_lab(labData.getPurpose_of_lab());
        labDataWithEntityDTO.setLabNo(labData.getLabNo());
        labDataWithEntityDTO.setKind_of_lab(labData.getKind_of_lab());
        labDataWithEntityDTO.setPrimary_lab_cord(labData.getPrimary_lab_cord());
        labDataWithEntityDTO.setGb(labData.getGb());
        labDataWithEntityDTO.setYellow_ports(labData.getYellow_ports());
        labDataWithEntityDTO.setGreen_ports(labData.getGreen_ports());
        labDataWithEntityDTO.setRed_ports(labData.getRed_ports());
        labDataWithEntityDTO.setDh(labData.getDh());
        labDataWithEntityDTO.setAcl_req(labData.getAcl_req());
        labDataWithEntityDTO.setKam(labData.getKam());
        labDataWithEntityDTO.setDescription(labData.getDescription());
        labDataWithEntityDTO.setDep_name(labData.getDep_name());
        labDataWithEntityDTO.setNew_equipment(labData.getNew_equipment());
        labDataWithEntityDTO.setFloor(labData.getFloor());
        labDataWithEntityDTO.setSecondary_lab_cord(labData.getSecondary_lab_cord());
        labDataWithEntityDTO.setLocal_itl(labData.getLocal_itl());
        labDataWithEntityDTO.setLocal_itl_proxy(labData.getLocal_itl_proxy());
        labDataWithEntityDTO.setBuilding(labData.getBuilding());
        labDataWithEntityDTO.setLocationCode(labData.getLocationCode());
        labDataWithEntityDTO.setCost_center(labData.getCost_center());
        labDataWithEntityDTO.setEntityName(labData.getEntityName());
        return labDataWithEntityDTO;
    }
}
