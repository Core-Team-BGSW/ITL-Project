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

    public List<LabData> searchLabsByCountryAndLocationCodeAndEntity(String country, String locationCode, String entity) {
        return labDataRepo.findByCountryAndLocationCodeAndEntity(country,locationCode,entity);
    }

    public List<LabData> searchLabsByCountryAndLocationCodeAndEntityAndGb(String country, String locationCode, String entity, String gb) {
        return labDataRepo.findByCountryAndLocationCodeAndEntityAndGb(country,locationCode,entity,gb);
    }

    public LabData searchLabsByBuildingAndLabNo(String building, String labNo) {
        return labDataRepo.findByBuildingAndLabNo(building,labNo);
    }

    public List<LabData> searchByBuildingAndFloor(String building, String floor) {
        return labDataRepo.findByBuildingAndFloor(building,floor);
    }

    public LabData searchByBuildingAndFloorAndLabNo(String building, String floor, String labNo) {
        return labDataRepo.findByBuildingAndFloorAndLabNo(building,floor,labNo);
    }
}
