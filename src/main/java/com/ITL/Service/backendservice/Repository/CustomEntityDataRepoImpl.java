package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.Entity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class CustomEntityDataRepoImpl implements CustomEntityDataRepo {
    private final MongoTemplate mongoTemplate;
    @Override
    public List<Entity> search(String query) {
        String[] searchTerms = query.split(" ");
        List<Criteria> criteriaList = new ArrayList<>();
        Query searchQuery = new Query();
        for(String term : searchTerms) {
            criteriaList.add((new Criteria().orOperator(
                    Criteria.where("locationCode").regex(term, "i"),  // Case-insensitive search
                    Criteria.where("entityName").regex(term, "i"),
                    Criteria.where("region").regex(term, "i"),
                    Criteria.where("country").regex(term, "i")
            )));
        }
        searchQuery.addCriteria(new Criteria().orOperator(criteriaList.toArray(new Criteria[0])));
        return mongoTemplate.find(searchQuery, Entity.class);
    }
}
