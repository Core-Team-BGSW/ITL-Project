package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.Entity;
import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Model.LabFormData;
import com.ITL.Service.backendservice.Repository.EntityRepo;
import com.ITL.Service.backendservice.Repository.LabDataRepo;
import com.ITL.Service.backendservice.Utility.ExcelConverter;
import com.ITL.Service.backendservice.Utility.SequenceGeneratorService;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import jakarta.mail.MessagingException;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CsvToDatabaseService {
    private final LabDataRepo labDataRepo;
    private final EntityRepo entityRepo;
    private final SequenceGeneratorService sequenceGeneratorService;
    private final UserDetailsUpdateService userDetailsUpdateService;
    @Lazy
    private final ExcelConverter excelConverter;
    public ResponseEntity<String> saveCsvToDatabase(String filePath) throws IOException, CsvValidationException {
        try(CSVReader csvReader = new CSVReader(new FileReader((filePath)))) {
            String[] nextRecord;
            csvReader.skip(2);
            nextRecord = csvReader.readNext();
            Map<AbstractMap.SimpleEntry<String,String>,Entity> entityMap = new HashMap<>();
            List<LabFormData> labFormDataList = new ArrayList<>(List.of());
            while((nextRecord != null))
            {
                if(nextRecord.length < 2 || allElementsEmpty(nextRecord)) break;
                LabData labData = getLabData(nextRecord);
                LabData temLabData = labDataRepo.findLabDataByLocationCodeAndEntityNameAndGbAndLabNoAndPrimary_lab_cordAndDep_name(labData.getLocationCode(), labData.getEntityName(), labData.getGb(), labData.getLabNo(), labData.getPrimary_lab_cord(), labData.getDep_name());
                if(temLabData == null) {
                    labData.setSeqId(sequenceGeneratorService.generateSequence(LabData.class.getName()));
                    labDataRepo.save(labData);
                }
                else labData = temLabData;

                String locationCode = nextRecord[3];
                String entityName = nextRecord[4];
                Entity entity1 = entityRepo.findByLocationCodeAndEntityName(locationCode, entityName);
                Entity entity = entityMap.get(new AbstractMap.SimpleEntry<>(locationCode,entityName));
                if(entity == null && entity1 == null)
                {
                    entity = getEntityData(nextRecord);
                    entity.setSeqId(sequenceGeneratorService.generateSequence(Entity.class.getName()));
                    entityMap.put(new AbstractMap.SimpleEntry<>(locationCode,entityName),entity);
                }
                if(entity == null)
                {
                    entity = entity1;
                }
                entity.getLabDataList().add(labData);
                LabFormData labFormData = ConvertToLabFormData(labData,entity);
                labFormDataList.add(labFormData);
                nextRecord = csvReader.readNext();
            }
            entityRepo.saveAll(entityMap.values());
//            userDetailsUpdateService.updateDatabase();
            excelConverter.sendEmailToAllUsers(labFormDataList);
            return ResponseEntity.ok("The file is Successfully stored into Database");
        }
        catch (IOException | CsvValidationException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while inserting CSV to Database: " + e.getMessage());
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    private LabFormData ConvertToLabFormData(LabData labData, Entity entity) {
        LabFormData labFormData = new LabFormData();
        labFormData.setAcl_req(labData.getAcl_req());
        labFormData.setDh(labData.getDh());
        labFormData.setCountry(entity.getCountry());
        labFormData.setLabNo(labData.getLabNo());
        labFormData.setBuilding(labData.getBuilding());
        labFormData.setGb(labData.getGb());
        labFormData.setFloor(labData.getFloor());
        labFormData.setLocal_itl(labData.getLocal_itl());
        labFormData.setDescription(labData.getDescription());
        labFormData.setBuilding(labData.getBuilding());
        labFormData.setAcl_req(labData.getAcl_req());
        labFormData.setCost_center(labData.getCost_center());
        labFormData.setYellow_ports(labData.getYellow_ports());
        labFormData.setRed_ports(labData.getRed_ports());
        labFormData.setGreen_ports(labData.getGreen_ports());
        labFormData.setDep_name(labData.getDep_name());
        labFormData.setEntityName(entity.getEntityName());
        labFormData.setKam(labData.getKam());
        labFormData.setKind_of_lab(labData.getKind_of_lab());
        labFormData.setShared_lab(labData.getShared_lab());
        labFormData.setSelf_audit_date(labData.getSelf_audit_date());
        labFormData.setPurpose_of_lab(labData.getPurpose_of_lab());
        labFormData.setLocationCode(entity.getLocationCode());
        labFormData.setSecondary_lab_cord(labData.getSecondary_lab_cord());
        labFormData.setPrimary_lab_cord(labData.getPrimary_lab_cord());
        labFormData.setRegion(entity.getRegion());
        return labFormData;
    }

    private Entity getEntityData(String[] nextRecord) {
        Entity entity = new Entity();
        entity.setRegion(nextRecord[1]);
        entity.setCountry(nextRecord[2]);
        entity.setLocationCode(nextRecord[3]);
        entity.setEntityName(nextRecord[4]);
        return entity;
    }

    private LabData getLabData(String[] nextRecord) {
        LabData labData = new LabData();
        labData.setLocationCode(nextRecord[3]);
        labData.setEntityName(nextRecord[4]);
        labData.setGb(nextRecord[5]);
        labData.setLocal_itl(nextRecord[6]);
        labData.setLocal_itl_proxy(nextRecord[7]);
        labData.setDh(nextRecord[8]);
        labData.setKam(nextRecord[9]);
        labData.setDep_name(nextRecord[10]);
        labData.setBuilding(nextRecord[11]);
        labData.setFloor(nextRecord[12]);
        labData.setLabNo(nextRecord[13]);
        labData.setPrimary_lab_cord(nextRecord[14]);
        labData.setSecondary_lab_cord(nextRecord[15]);
        labData.setCost_center(nextRecord[16]);
        labData.setKind_of_lab(nextRecord[17]);
        labData.setPurpose_of_lab(nextRecord[18]);
        labData.setDescription(nextRecord[19]);
        labData.setAcl_req(nextRecord[20]);
        labData.setGreen_ports(nextRecord[21]);
        labData.setYellow_ports(nextRecord[22]);
        labData.setRed_ports(nextRecord[23]);
        labData.setNew_equipment(nextRecord[24]);
        labData.setShared_lab(nextRecord[25]);
        labData.setSelf_audit_date(nextRecord[26]);
        return labData;
    }

    private boolean allElementsEmpty(@NotNull String[] nextRecord) {
        for(String elm : nextRecord)
        {
            if(elm !=null && !elm.trim().isEmpty()) return false;
        }
        return true;
    }
}
