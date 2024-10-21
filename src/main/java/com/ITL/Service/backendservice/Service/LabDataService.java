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
        List<LabData> labDataList = labDataRepo.findAll();
        List<LabDataWithEntityDTO> labDataWithEntityDTOList = new ArrayList<>();
        for(LabData labData : labDataList)
        {
            LabDataWithEntityDTO labDataWithEntityDTO = convertToLabDataWithEntityDTO(labData);
            Entity entity = entityRepo.findByLabDataId(labData.getId());
            labDataWithEntityDTO.setRegion(entity.getRegion());
            labDataWithEntityDTO.setCountry(entity.getCountry());
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
        labDataWithEntityDTO.setSelf_audit_date(labData.getSelf_audit_date());
        return labDataWithEntityDTO;
    }
}
