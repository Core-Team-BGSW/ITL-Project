package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.DTO.LabDataWithEntityDTO;
import com.ITL.Service.backendservice.Model.Entity;
import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Repository.EntityRepo;
import com.ITL.Service.backendservice.Repository.LabDataRepo;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.slf4j.ILoggerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class LabDataService {
    private final LabDataRepo labDataRepo;
    private final EntityRepo entityRepo;
    private static Logger logger= LoggerFactory.getLogger(LabDataService.class);

    public List<LabData> getLabDataByEntityNameAndGB(String entityName, String gb) {
        return labDataRepo.findLabDataByEntityNameAndGb(entityName,gb);
    }

    public ResponseEntity<String> deleteLabDataByCustomQuery(String query) {
        return labDataRepo.deleteByCustomQuery(query);
    }

    public List<LabData> getAllLabsData() {
        return labDataRepo.findAll();
    }

    public List<String> getUniqueGbNames() {
        return labDataRepo.findUniqueGB();
    }

    public List<String> getUniqueEntityNames() {
        return labDataRepo.findUniqueEntity();
    }

    public List<LabData> getLabDataWithPrimaryLabCoordinator(String primaryLabCord)
    {
        return labDataRepo.findByPrimary_lab_cord(primaryLabCord);
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
        labDataWithEntityDTO.setId(String.valueOf(labData.getId()));
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

    public List<LabData> getLabDataWithLocalItl(String localItl) {
        return labDataRepo.findByLocal_itl(localItl);
    }

    public List<LabData> getLabDataWithLocalItlProxy(String localItlProxy) {
        return labDataRepo.findByLocal_itl_proxy(localItlProxy);
    }

    public List<LabDataWithEntityDTO> findByLabResponsible(String userId) {
        List<LabData> labs = labDataRepo.findByLabResponsible(userId);

        List<LabDataWithEntityDTO> labDataWithEntityDTOList = new ArrayList<>();
        for(LabData labData : labs)
        {
            LabDataWithEntityDTO labDataWithEntityDTO = convertToLabDataWithEntityDTO(labData);
            logger.info("The type of ID: {}", labData.getId().getClass().getName());
            Entity entity = entityRepo.findByLocationCodeAndEntityName(labData.getLocationCode(), labData.getEntityName());
            logger.info("The type of entity Lab Data ID {}", entity.getLabDataList().getFirst().getId().getClass().getName());
            entity = entityRepo.findByLabDataId(labData.getId());
            logger.info("ENtity name :: {}",entity);
            labDataWithEntityDTO.setRegion(entity.getRegion());
            labDataWithEntityDTO.setCountry(entity.getCountry());
            labDataWithEntityDTOList.add(labDataWithEntityDTO);
        }
        return labDataWithEntityDTOList;
    }
    public ResponseEntity<Map<String, String>> deleteLabDataById(String objId) {
        ObjectId Id = new ObjectId(objId);
        Map<String, String> response = new HashMap<>();
        boolean isDeleted = false;
        if(labDataRepo.existsById(Id))
        {
            isDeleted = true;
            Optional<LabData> labData = labDataRepo.findById(Id);
            if(labData.isPresent()) {
                String entityName = labData.get().getEntityName();
                String locationCode = labData.get().getLocationCode();
                entityRepo.findByEntityNameAndLocationCode(entityName,locationCode).getLabDataList().remove(labData.get());
                labDataRepo.deleteById(Id);
            }
        }
        if (isDeleted) {
            response.put("Response:", "The lab is successfully archived with the given " +Id);
            return ResponseEntity.ok(response); // HTTP 200 OK with JSON response
        } else {
            response.put("Response:", "Lab Data with given " + Id + " not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response); // HTTP 404 NOT FOUND with JSON response
        }
    }

}