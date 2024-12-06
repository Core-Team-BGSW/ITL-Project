package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.Entity;

import java.util.List;

public interface CustomEntityDataRepo {
    List<Entity> search(String query);
}
