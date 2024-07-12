package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Service.LabDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("bosch_labs")
public class LabDataController {
    private final LabDataService labDataService;

    @GetMapping("/labs_data")
    @ResponseStatus(HttpStatus.OK)
    public List<LabData> getLabDataList() {
        return labDataService.getLabsData();
    }

    @GetMapping("/labData")
    @ResponseStatus(HttpStatus.OK)
    public List<LabData> getLabData(
             @RequestParam String country,
             @RequestParam(required = false) String region,
             @RequestParam(required = false) String locationCode,
             @RequestParam(required = false) String entity,
             @RequestParam(required = false) String gb) {
        if(locationCode == null && entity == null && gb == null)
        {
            return labDataService.searchLabsByCountryAndRegion(country,region);
        }
        else if(entity == null && gb == null)
        {
           return labDataService.searchLabsByCountryAndRegionAndLocationCode(country,region,locationCode);
        }
        else if(region == null && gb == null)
        {
            return labDataService.searchLabsByCountryAndLocationCodeAndEntity(country,locationCode,entity);
        }
        return labDataService.searchLabsByCountryAndLocationCodeAndEntityAndGb(country,locationCode,entity,gb);
    }

    @GetMapping("/labDataByBuilding")
    @ResponseStatus(HttpStatus.OK)
    public LabData getLabDataByBuildingAndFloor(
            @RequestParam String building,
            @RequestParam(required = false) String floor,
            @RequestParam(required = false) String lab_no) {
        if(floor == null)
        {
            return labDataService.searchLabsByBuildingAndLabNo(building,lab_no);
        }
        return labDataService.searchByBuildingAndFloorAndLabNo(building,floor,lab_no);
    }

    @GetMapping("labDataByFloor")
    @ResponseStatus(HttpStatus.OK)
    public List<LabData> getLabDataByBuildingAndFloor(
            @RequestParam String building,
            @RequestParam String floor) {
        return labDataService.searchByBuildingAndFloor(building,floor);
    }

}
