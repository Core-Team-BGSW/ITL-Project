package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.FileData;
import com.ITL.Service.backendservice.Repository.FileDataRepo;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CsvToDatabaseService {
    private final FileDataRepo fileDataRepo;
    public String saveCsvToDatabase(String filePath) throws IOException, CsvValidationException {
        try(CSVReader csvReader = new CSVReader(new FileReader((filePath)))) {
            String[] nextRecord;
            csvReader.skip(1);
            List<FileData> fileDataList = new ArrayList<>();
            nextRecord = csvReader.readNext();
            while((nextRecord != null))
            {
                FileData fileData = new FileData();
                if(nextRecord.length < 2 || allElementsEmpty(nextRecord)) break;
                fileData.setSr_no(nextRecord[0]);
                fileData.setRegion(nextRecord[1]);
                fileData.setCountry(nextRecord[2]);
                fileData.setLocation(nextRecord[3]);
                fileData.setLocation_code(nextRecord[4]);
                fileData.setEntity(nextRecord[5]);
                fileData.setGb(nextRecord[6]);
                fileData.setLocal_itl(nextRecord[7]);
                fileData.setLocal_itl_proxy(nextRecord[8]);
                fileData.setDh(nextRecord[9]);
                fileData.setKam(nextRecord[10]);
                fileData.setDep_name(nextRecord[11]);
                fileData.setBuilding(nextRecord[12]);
                fileData.setFloor(nextRecord[13]);
                fileData.setLab_no(nextRecord[14]);
                fileData.setPrimary_lab_cord(nextRecord[15]);
                fileData.setSecondary_lab_cord(nextRecord[16]);
                fileData.setCost_center(nextRecord[17]);
                fileData.setKind_of_lab(nextRecord[18]);
                fileData.setPurpose_of_lab(nextRecord[19]);
                fileData.setDescription(nextRecord[20]);
                fileData.setNew_equipment(nextRecord[21]);
                fileData.setShared_lab(nextRecord[22]);
                fileData.setAcl_req(nextRecord[23]);
                fileData.setGreen_ports(nextRecord[24]);
                fileData.setYellow_ports(nextRecord[25]);
                fileData.setRed_ports(nextRecord[26]);
                fileDataList.add(fileData);
                nextRecord = csvReader.readNext();
            }
            System.out.println("mohit");
            fileDataRepo.saveAll(fileDataList);
            return "The file is Successfully stored into Database";
        }
        catch (IOException | CsvValidationException e) {
            return ("Some error occurred while writing csv to database" + e);
        }
    }

    private boolean allElementsEmpty(String[] nextRecord) {
        for(String elm : nextRecord)
        {
            if(elm !=null && !elm.trim().isEmpty()) return false;
        }
        return true;
    }
}
