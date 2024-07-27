package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.Entity;
import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Repository.EntityRepo;
import com.ITL.Service.backendservice.Repository.LabDataRepo;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CsvToDatabaseService {
    private final LabDataRepo labDataRepo;
    private final EntityRepo entityRepo;
    public String saveCsvToDatabase(String filePath) throws IOException, CsvValidationException {
        try(CSVReader csvReader = new CSVReader(new FileReader((filePath)))) {
            Map<String, Entity> entityMap = new HashMap<>();
            String[] nextRecord;
            csvReader.skip(1);
            nextRecord = csvReader.readNext();
            while((nextRecord != null))
            {
                if(nextRecord.length < 2 || allElementsEmpty(nextRecord)) break;
                LabData labData = getLabData(nextRecord);
                labDataRepo.save(labData);
                String entityName = nextRecord[5];
                Entity entity = entityMap.get(entityName);
                if(entity == null)
                {
                    entity = getEntityData(nextRecord);
                    entityMap.put(entityName,entity);
                }
                entity.getLabDataList().add(labData);
                nextRecord = csvReader.readNext();
            }
            entityRepo.saveAll(entityMap.values());
            return "The file is Successfully stored into Database";
        }
        catch (IOException | CsvValidationException e) {
            return ("Some error occurred while writing csv to database" + e);
        }
    }

    private static Entity getEntityData(String[] nextRecord) {
        Entity entity = new Entity();
        entity.setId(nextRecord[0]);
        entity.setRegion(nextRecord[1]);
        entity.setCountry(nextRecord[2]);
        entity.setLocation(nextRecord[3]);
        entity.setLocationCode(nextRecord[4]);
        entity.setEntityName(nextRecord[5]);
        return entity;
    }

    private static LabData getLabData(String[] nextRecord) {
        LabData labData = new LabData();
        labData.setId(nextRecord[0]);
        labData.setEntityName(nextRecord[5]);
        labData.setGb(nextRecord[6]);
        labData.setLocal_itl(nextRecord[7]);
        labData.setLocal_itl_proxy(nextRecord[8]);
        labData.setDh(nextRecord[9]);
        labData.setKam(nextRecord[10]);
        labData.setDep_name(nextRecord[11]);
        labData.setBuilding(nextRecord[12]);
        labData.setFloor(nextRecord[13]);
        labData.setLabNo(nextRecord[14]);
        labData.setPrimary_lab_cord(nextRecord[15]);
        labData.setSecondary_lab_cord(nextRecord[16]);
        labData.setCost_center(nextRecord[17]);
        labData.setKind_of_lab(nextRecord[18]);
        labData.setPurpose_of_lab(nextRecord[19]);
        labData.setDescription(nextRecord[20]);
        labData.setNew_equipment(nextRecord[21]);
        labData.setShared_lab(nextRecord[22]);
        labData.setAcl_req(nextRecord[23]);
        labData.setGreen_ports(nextRecord[24]);
        labData.setYellow_ports(nextRecord[25]);
        labData.setRed_ports(nextRecord[26]);
        return labData;
    }

    private boolean allElementsEmpty(String[] nextRecord) {
        for(String elm : nextRecord)
        {
            if(elm !=null && !elm.trim().isEmpty()) return false;
        }
        return true;
    }
}
