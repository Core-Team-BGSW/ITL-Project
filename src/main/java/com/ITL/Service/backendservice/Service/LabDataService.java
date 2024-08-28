package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Repository.CustomLabDataRepoImpl;
import com.ITL.Service.backendservice.Repository.LabDataRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LabDataService {
    private final LabDataRepo labDataRepo;
    private final CustomLabDataRepoImpl customLabDataRepo;

    public List<LabData> getLabDataByEntityNameWithLabDataFields(Map<String,Object> parameters) {
        return customLabDataRepo.findLabDataByEntityNameWithLabDataFields(parameters);
    }

    public List<LabData> getLabDataByEntityNameAndGB(String entityName, String gb) {
        return labDataRepo.findLabDataByEntityNameAndGb(entityName,gb);
    }

    public ResponseEntity<String> deleteLabDataByPrimaryLabCoordinator(String primaryLabCord) {
        return customLabDataRepo.deleteByPrimaryLabCoordinator(primaryLabCord);
    }

    public List<LabData> getAllLabsData() {
        return labDataRepo.findAll();
    }
}
