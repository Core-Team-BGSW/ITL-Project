package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.DTO.LabDataWithEntityDTO;
import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Service.LabDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/boschLabs")
@RestController
public class LabDataController {
    private final LabDataService labDataService;

    @GetMapping("/labData/{gb}")
    public List<LabData> getLabDataByEntityNameAndGB(@RequestParam String entityName,@PathVariable("gb") String gb)
    {
        return labDataService.getLabDataByEntityNameAndGB(entityName,gb);
    }

    @GetMapping("/labs")
    public List<LabData> getLabDataByEntityNameWithLabDataFields(@RequestParam Map<String, String> allParams){
        Map<String, Object> parameters = new HashMap<>(allParams);
        return labDataService.getLabDataByEntityNameWithLabDataFields(parameters);
    }

    @DeleteMapping("/delete/labData")
    public ResponseEntity<String> deleteLabDataByPrimaryLabCoordinator(@RequestParam String primary_lab_cord)
    {
        return labDataService.deleteLabDataByPrimaryLabCoordinator(primary_lab_cord);
    }

    @GetMapping("/allLabs")
    public List<LabData> getAllLabsData()
    {
        return labDataService.getAllLabsData();
    }

    @GetMapping("/allLabsWithEntity")
    public List<LabDataWithEntityDTO> getAllLabDataWithEntities() {
        return labDataService.getAllLabDataWithEntities();
    }
}
