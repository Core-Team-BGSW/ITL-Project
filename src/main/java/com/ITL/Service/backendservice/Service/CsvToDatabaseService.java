package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.FileData;
import com.ITL.Service.backendservice.Repository.FileDataRepo;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CsvToDatabaseService {
    private final FileDataRepo fileDataRepo;
    public String saveCsvToDatabase(String filePath) throws IOException, CsvValidationException {
        CSVReader csvReader = new CSVReader(new FileReader((filePath)));
        String[] nextRecord;
        csvReader.skip(1);
        List<FileData> fileDataList = new ArrayList<>();
        while((nextRecord = csvReader.readNext()) !=null)
        {
            FileData fileData = new FileData();
            fileData.setSr_no(nextRecord[0]);
            fileData.setCountry(nextRecord[1]);
            fileData.setLocation(nextRecord[2]);
            fileData.setLocation_code(nextRecord[3]);
            fileData.setEntity(nextRecord[4]);
            fileData.setGb(nextRecord[5]);
            fileData.setLocal_itl(nextRecord[6]);
            fileData.setLocal_itl_proxy(nextRecord[7]);
            fileData.setDh(nextRecord[8]);
            fileData.setKam(nextRecord[9]);
            fileData.setDep_name(nextRecord[10]);
            fileData.setBuilding(nextRecord[11]);
            fileData.setFloor(nextRecord[12]);
            fileData.setLab_no(nextRecord[13]);
            fileData.setCost_center(nextRecord[14]);
            fileData.setLab_responsible_NTID_primary(nextRecord[15]);
            fileData.setLab_responsible_NTID_secondary(nextRecord[16]);
            fileData.setAcl_implemented(nextRecord[17]);
            fileDataList.add(fileData);
        }
        fileDataRepo.insert(fileDataList);
        return "The file is Successfully stored into Database";
    }
}
