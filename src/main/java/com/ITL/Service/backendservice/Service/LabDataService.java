package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Repository.LabDataRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LabDataService {
    private final LabDataRepo labDataRepo;

    public List<LabData> getLabsData() {
        List<LabData> labData;
        labData = labDataRepo.findAll();
        return labData;
    }

    public List<LabData> searchLabsByCountryAndRegionAndLocationCode(String country, String region, String locationCode) {
        return labDataRepo.findByCountryAndRegionAndLocationCode(country,region,locationCode);
    }

    public List<LabData> searchLabsByCountryAndRegion(String country, String region) {
        return labDataRepo.findByCountryAndRegion(country,region);
    }
}
