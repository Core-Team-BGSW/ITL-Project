package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Service.LabDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/boschLabs")
@RestController
public class LabDataController {
    private final LabDataService labDataService;
    @GetMapping("/labData")
    public List<LabData> getLabDataByEntityNameAndFloor(@RequestParam String entityName, @RequestParam String floor)
    {
        return labDataService.getLabDataByEntityNameAndFloor(entityName, floor);
    }

    @GetMapping("/labs")
    public List<LabData> getLabDataByEntityNameCountryDepNameFloor(@RequestParam Map<String, String> allParams){
        Map<String, Object> parameters = new HashMap<>(allParams);
        return labDataService.getLabDataByEntityNameCountryDepNameFloor(parameters);
    }

}
