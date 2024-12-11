package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.Entity;
import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Repository.EntityRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EntityService {
    private final EntityRepo entityRepo;
    public List<LabData> getLabDataByEntityNameAndCountry(String entityName, String country) {
        return entityRepo.findLabDataByEntityNameAndCountry(entityName,country);
    }
    public List<Entity> getAllEntityData() {
        return entityRepo.findAll();
    }

}
