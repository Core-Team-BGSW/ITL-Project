package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Service.LabDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/boschLabs")
@RestController
public class LabDataController {
    private final LabDataService labDataService;

    @GetMapping("/labData")
    public List<LabData> getLabDataByEntityName(@RequestParam String entityName)
    {
        return labDataService.getLabDataByEntityName(entityName);
    }
}
