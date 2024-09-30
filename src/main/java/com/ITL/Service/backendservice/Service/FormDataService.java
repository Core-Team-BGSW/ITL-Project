package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.Entity;
import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Model.LabFormData;
import com.ITL.Service.backendservice.Repository.EntityRepo;
import com.ITL.Service.backendservice.Repository.LabDataRepo;
import com.ITL.Service.backendservice.Utility.SequenceGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FormDataService {
    private final EntityRepo entityRepo;
    private final LabDataRepo labDataRepo;
    private final SequenceGeneratorService sequenceGeneratorService;

    @Transactional
    public void saveFormData(LabFormData labFormData) {
        LabData labData = getLabData(labFormData);
        LabData temLabData = labDataRepo.findLabDataByLocationCodeAndEntityNameAndGbAndLabNoAndPrimary_lab_cordAndDep_name(labData.getLocationCode(), labData.getEntityName(), labData.getGb(), labData.getLabNo(), labData.getPrimary_lab_cord(), labData.getDep_name());
        if(temLabData == null)
        {
            labData.setSeqId(sequenceGeneratorService.generateSequence(LabData.class.getName()));
            labData = labDataRepo.save(labData);
        }
        else labData = temLabData;


        Entity entity;
        if(entityRepo.findByEntityName(labFormData.getEntityName()) instanceof org.w3c.dom.Entity)
        {
            entity = entityRepo.findByEntityName(labFormData.getEntityName());
            entity.getLabDataList().add(labData);
            return;
        }
        entity = getEntityData(labFormData);
        entity.getLabDataList().add(labData);
        entityRepo.save(entity);
        entity.setSeqId(sequenceGeneratorService.generateSequence(Entity.class.getName()));
    }
    public LabData getLabData(LabFormData labFormData)
    {
        LabData labData = new LabData();
        labData.setDh(labFormData.getDh());
        labData.setGb(labFormData.getGb());
        labData.setBuilding(labFormData.getBuilding());
        labData.setLocationCode(labFormData.getLocationCode());
        labData.setAcl_req(labFormData.getAcl_req());
        labData.setFloor(labFormData.getFloor());
        labData.setKam(labFormData.getKam());
        labData.setDescription(labFormData.getDescription());
        labData.setKind_of_lab(labFormData.getKind_of_lab());
        labData.setLabNo(labFormData.getLabNo());
        labData.setCost_center(labFormData.getCost_center());
        labData.setDep_name(labFormData.getDep_name());
        labData.setGreen_ports(labFormData.getGreen_ports());
        labData.setYellow_ports(labFormData.getYellow_ports());
        labData.setRed_ports(labFormData.getRed_ports());
        labData.setLocal_itl(labFormData.getLocal_itl());
        labData.setLocal_itl_proxy(labFormData.getLocal_itl_proxy());
        labData.setPrimary_lab_cord(labFormData.getPrimary_lab_cord());
        labData.setNew_equipment(labFormData.getNew_equipment());
        labData.setPurpose_of_lab(labFormData.getPurpose_of_lab());
        labData.setShared_lab(labFormData.getShared_lab());
        labData.setSecondary_lab_cord(labFormData.getSecondary_lab_cord());
        labData.setPrimary_lab_cord(labData.getPrimary_lab_cord());
        return labData;
    }
    public Entity getEntityData(LabFormData labFormData)
    {
        Entity entity = new Entity();
        entity.setEntityName(labFormData.getEntityName());
        entity.setCountry(labFormData.getCountry());
        entity.setLocationCode(labFormData.getLocationCode());
        entity.setRegion(labFormData.getRegion());
        entity.setLocation(labFormData.getLocation());
        return entity;
    }
}
