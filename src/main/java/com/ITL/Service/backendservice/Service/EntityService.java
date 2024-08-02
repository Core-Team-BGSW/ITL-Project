package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Repository.EntityRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EntityService {
    @Autowired
    private EntityRepo entityRepo;
    public List<LabData> getLabDataByEntityNameAndCountry(String entityName, String country) {
        return entityRepo.findLabDataByEntityNameAndCountry(entityName,country);
    }
}
