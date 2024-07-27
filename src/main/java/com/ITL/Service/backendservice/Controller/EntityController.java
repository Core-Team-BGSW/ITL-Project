package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Service.EntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/boschLabsByEntity")
@RestController
public class EntityController {
    private final EntityService entityService;
    @GetMapping("/labData")
    public List<LabData> getLabDataByEntityNameAndCountry(@RequestParam String entityName, @RequestParam String country)
    {
        return entityService.getLabDataByEntityNameAndCountry(entityName,country);
    }
}
