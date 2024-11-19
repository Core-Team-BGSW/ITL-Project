package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.LabData;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface CustomLabDataRepo {
    ResponseEntity<String> deleteByCustomQuery(String query);
    List<String> findUniqueGB();
    List<String> findUniqueEntity();
    List<LabData> search(String query);
}
