package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.DTO.EntityProjection;
import com.ITL.Service.backendservice.DTO.SearchResult;
import com.ITL.Service.backendservice.Model.Entity;
import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Repository.EntityRepo;
import com.ITL.Service.backendservice.Repository.LabDataRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {
    private final EntityRepo entityRepo;
    private final LabDataRepo labDataRepo;

    public SearchResult search(String query) {
        List<Entity> entities = entityRepo.search(query);
        List<LabData> labData = labDataRepo.search(query);
        List<EntityProjection> entityProjections = new ArrayList<>();
        for(Entity entity : entities)
        {
            EntityProjection entityProjection = new EntityProjection();
            entityProjection.setEntityName(entity.getEntityName());
            entityProjection.setRegion(entity.getRegion());
            entityProjection.setLocationCode(entity.getLocationCode());
            entityProjection.setCountry(entity.getCountry());
            entityProjections.add(entityProjection);
        }

        return new SearchResult(entityProjections, labData);
    }
}
