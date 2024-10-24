package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.LabData;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface CustomLabDataRepo {
    List<LabData> findLabDataByEntityNameWithLabDataFields(Map<String,Object> parameters);
    ResponseEntity<String> deleteByPrimaryLabCoordinator(String primary_lab_cord);
    List<String> findUniqueGB();
    List<String> findUniqueEntity();


}
