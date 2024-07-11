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
    public List<LabData> getLabDataByCountryAndRegionAndLocationCode(@RequestParam String country, @RequestParam String region, @RequestParam(required = false) String locationCode) {
        if(locationCode == null)
        {
            return labDataService.searchLabsByCountryAndRegion(country,region);
        }
        return labDataService.searchLabsByCountryAndRegionAndLocationCode(country,region,locationCode);
    }
}
