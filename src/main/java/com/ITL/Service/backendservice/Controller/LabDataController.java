package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.DTO.LabDataWithEntityDTO;
import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Service.LabDataService;
import com.azure.core.annotation.Get;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @DeleteMapping("/labData/delete")
    public ResponseEntity<String> deleteLabDataByCustomQuery(@RequestParam String query)
    {
        return labDataService.deleteLabDataByCustomQuery(query);
    }

    @GetMapping("/labDataWithPrimaryLabCord/{primary_lab_cord}")
    public List<LabData> getLabDataWithPrimaryLabCoordinator(@PathVariable("primary_lab_cord") String primary_lab_cord)
    {
        return labDataService.getLabDataWithPrimaryLabCoordinator(primary_lab_cord);
    }


    @GetMapping("/labDataWithLocalItl/{local_itl}")
    public List<LabData> getLabDataWithLocalItl(@PathVariable("local_itl") String localItl)
    {
        return labDataService.getLabDataWithLocalItl(localItl);
    }

    @GetMapping("/labDataLocalItlProxy/{local_itl_proxy}")
    public List<LabData> getLabDataWithLocalItlProxy(@PathVariable("local_itl_proxy") String localItlProxy)
    {
        return labDataService.getLabDataWithLocalItlProxy(localItlProxy);
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

    @GetMapping("/allGB")
    public ResponseEntity<List<String>> getUniqueGbNames() {
        List<String> uniqueGbNames = labDataService.getUniqueGbNames();
        if (uniqueGbNames.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 No Content if empty
        }
        return ResponseEntity.ok(uniqueGbNames);
    }

    @GetMapping("/allEntity")
    public ResponseEntity<List<String>> getUniqueEntityNames() {
        List<String> uniqueEntityNames = labDataService.getUniqueEntityNames();
        if (uniqueEntityNames.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 No Content if empty
        }
        return ResponseEntity.ok(uniqueEntityNames);
    }
    @GetMapping("/by-responsible/{userId}")
    public ResponseEntity<List<LabDataWithEntityDTO >> getLabsByLabResponsible(@PathVariable String userId) {

        List<LabDataWithEntityDTO > labs = labDataService.getLabsByLabResponsible(userId);
        return ResponseEntity.ok(labs);
    }

    @GetMapping("archieve/by-responsible/{userId}")
    public ResponseEntity<List<LabDataWithEntityDTO >> getLabsByLabResponsibleArchieve(@PathVariable String userId) {

        List<LabDataWithEntityDTO > labs = labDataService.getLabsByLabResponsibleArchieve(userId);
        return ResponseEntity.ok(labs);
    }

//    @DeleteMapping("/labData/archive/{id}")
//    public ResponseEntity<Map<String, String>> deleteLabDataById(@PathVariable("id") String id)
//    {
//        return labDataService.deleteLabDataById(id);
//    }

    @PatchMapping("/labData/archive/{id}")
    public ResponseEntity<Map<String, String>> archiveLabDataById(@PathVariable("id") String id) {
        return labDataService.archiveLabDataById(id);
    }

}
