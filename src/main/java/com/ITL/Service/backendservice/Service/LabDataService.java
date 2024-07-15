package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.Entity;
import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Repository.EntityRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LabDataService {
    private final MongoTemplate mongoTemplate;

    public List<LabData> getLabDataByEntityName(String name) {
        LookupOperation lookupOperation = LookupOperation.newLookup()
                .from("entity")
                .localField("name")
                .foreignField("name")
                .as("entity");
        Aggregation aggregation = Aggregation.newAggregation(Aggregation.match(Criteria.where("name").is(name)),lookupOperation);
        return mongoTemplate.aggregate(aggregation,"lab_data",LabData.class).getMappedResults();
    }
}
