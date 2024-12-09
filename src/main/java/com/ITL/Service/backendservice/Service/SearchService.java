package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.DTO.EntityProjection;
import com.ITL.Service.backendservice.DTO.SearchResult;
import com.ITL.Service.backendservice.Exception.CustomException;
import com.ITL.Service.backendservice.Model.Entity;
import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Repository.EntityRepo;
import com.ITL.Service.backendservice.Repository.LabDataRepo;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {
    private final EntityRepo entityRepo;
    private final LabDataRepo labDataRepo;

    private static final Logger logger = LoggerFactory.getLogger(SearchService.class);

    public SearchResult search(String query) {
        List<Entity> entities = entityRepo.search(query);
        List<LabData> labData = labDataRepo.search(query);
        if(entities == null || labData == null)
        {
            logger.error("The entity or labData is not present according to search query in our database");
            throw new CustomException("The entities and labData is not present in the database according to the search query");
        }
        List<EntityProjection> entityProjections = getEntityProjections(entities);
        return new SearchResult(entityProjections, labData);
    }

    private static @NotNull List<EntityProjection> getEntityProjections(List<Entity> entities) {
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
        return entityProjections;
    }
}
