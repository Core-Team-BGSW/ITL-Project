package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.LocationData;
import com.ITL.Service.backendservice.Repository.LocationDataRepo;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationDataService {
    private final LocationDataRepo locationDataRepo;
    public void readCsvAndSaveToMongoDB(MultipartFile filePath) throws IOException {
        List<LocationData> dataList = new ArrayList<>();
        try(CSVReader csvReader = new CSVReader(new InputStreamReader(filePath.getInputStream(),StandardCharsets.UTF_8))){
            String[] header = csvReader.readNext();
            String[] line;
            while((line = csvReader.readNext())!= null)
            {
                LocationData locationData = new LocationData();
                locationData.setRegion(line[0]);
                locationData.setLocationCode(line[2]);
                locationData.setCountry(line[1]);
                dataList.add(locationData);
            }
        } catch (CsvValidationException e) {
            throw new RuntimeException(e);
        }
        locationDataRepo.saveAll(dataList);
    }

    public List<LocationData> locationData() {
        return locationDataRepo.findAll();
    }
}
