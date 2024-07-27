package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.LabData;

import java.util.List;
import java.util.Map;

public interface CustomLabDataRepo {
    List<LabData> findLabDataByEntityNameCountryDepNameFloor(Map<String,Object> parameters);
}
