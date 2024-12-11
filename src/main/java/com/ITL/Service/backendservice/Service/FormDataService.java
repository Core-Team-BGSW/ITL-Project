package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.Entity;
import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Model.LabFormData;
import com.ITL.Service.backendservice.Repository.EntityRepo;
import com.ITL.Service.backendservice.Repository.LabDataRepo;
import com.ITL.Service.backendservice.Utility.SequenceGeneratorService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FormDataService {
    private final EntityRepo entityRepo;
    private final LabDataRepo labDataRepo;
    private final SequenceGeneratorService sequenceGeneratorService;

    private static final Logger logger = LoggerFactory.getLogger(FormDataService.class);

    @Transactional
    public void saveFormData(LabFormData labFormData) {
        LabData labData = getLabData(labFormData);
        LabData temLabData = labDataRepo.findLabDataByLocationCodeAndEntityNameAndGbAndLabNoAndPrimary_lab_cordAndDep_name(labData.getLocationCode(), labData.getEntityName(), labData.getGb(), labData.getLabNo(), labData.getPrimary_lab_cord(), labData.getDep_name());
        logger.info("temlabdattest {}",temLabData);
        if(temLabData == null)
        {
            logger.info("The LabData is null we are storing new Lab data into the Database!");
            labData.setSeqId(sequenceGeneratorService.generateSequence(LabData.class.getName()));
            labData = labDataRepo.save(labData);
        }
        else labData = temLabData;


        Entity entity;
        if(entityRepo.findByLocationCodeAndEntityName(labData.getLocationCode(), labData.getEntityName())!=null)
        {

            entity = entityRepo.findByLocationCodeAndEntityName(labData.getLocationCode(), labData.getEntityName());
            entity.getLabDataList().add(labData);
            entityRepo.save(entity);
            return;
        }
        logger.info("The entityData is null we are storing new Entity Data into the Database!");
        entity = getEntityData(labFormData);
        logger.info("the entity name {}",entity.getEntityName());
        entity.getLabDataList().add(labData);
        entityRepo.save(entity);
        entity.setSeqId(sequenceGeneratorService.generateSequence(Entity.class.getName()));
    }
    public LabData getLabData(LabFormData labFormData)
    {
        LabData labData = new LabData();
        labData.setDh(labFormData.getDh());
        labData.setGb(labFormData.getGb());
        labData.setEntityName(labFormData.getEntityName());
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
        labData.setPrimary_lab_cord(labFormData.getPrimary_lab_cord());
        labData.setSelf_audit_date(labFormData.getSelf_audit_date());
        return labData;
    }
    public Entity getEntityData(LabFormData labFormData)
    {
        Entity entity = new Entity();
        entity.setEntityName(labFormData.getEntityName());
        entity.setCountry(labFormData.getCountry());
        entity.setLocationCode(labFormData.getLocationCode());
        entity.setRegion(labFormData.getRegion());
        return entity;
    }
}
