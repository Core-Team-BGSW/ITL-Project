package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Exception.ParametersNotValidException;
import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Service.LabDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Repository
@RequiredArgsConstructor
public class CustomLabDataRepoImpl implements CustomLabDataRepo{
    private final MongoTemplate mongoTemplate;

    @Override
    public List<LabData> findLabDataByEntityNameWithLabDataFields(Map<String,Object> parameters) {
        if(parameters.isEmpty())
        {
            throw new ParametersNotValidException("Please provide the valid parameters! The parameters can't be blank");
        }

        final Logger LOGGER = Logger.getLogger(LabDataService.class.getName());
        List<AggregationOperation> operations = new ArrayList<>();

        if(!parameters.containsKey("entityName"))
        {
            throw new ParametersNotValidException("Please provide the valid entityName it can't be null or blank");
        }

        operations.add(Aggregation.match(Criteria.where("entityName").is(parameters.get("entityName"))));
        operations.add(Aggregation.lookup("entity", "entityName", "entityName", "entityDetails"));
        operations.add(Aggregation.unwind("entityDetails"));


        if(parameters.containsKey("locationCode"))
        {
            operations.add(Aggregation.match(Criteria.where("entityDetails.locationCode").is(parameters.get("locationCode"))));
        }

        if(parameters.containsKey(("gb")))
        {
            operations.add(Aggregation.match(Criteria.where("gb").is(parameters.get("gb"))));
        }

        if (parameters.containsKey("country")) {
            operations.add(Aggregation.match(Criteria.where("entityDetails.country").is(parameters.get("country"))));
        }

        if(parameters.containsKey("gb"))
        {
            if(parameters.containsKey("depName"))
            {
                operations.add(Aggregation.match(Criteria.where("dep_name").is(parameters.get("depName"))));
            }
        }
        if(parameters.containsKey("dh"))
        {
            operations.add(Aggregation.match(Criteria.where("dh").is(parameters.get("dh"))));
        }

        if(parameters.containsKey("locationCode"))
        {
            if(parameters.containsKey("depName"))
            {
                operations.add(Aggregation.match(Criteria.where("dep_name").is(parameters.get("depName"))));
            }
            if(parameters.containsKey("building"))
            {
                operations.add(Aggregation.match(Criteria.where("building").is(parameters.get("building"))));
            }
            if(parameters.containsKey("building") && parameters.containsKey("floor")) {
                operations.add(Aggregation.match(Criteria.where("floor").is(parameters.get("floor"))));
            }
            if(parameters.containsKey("building") && parameters.containsKey("labNo"))
            {
                operations.add(Aggregation.match(Criteria.where("labNo").is(parameters.get("labNo"))));
            }
        }
        else {
            throw new ParametersNotValidException("Location Code is required to fetch lab Data");
        }

        //Logging the operations of aggregation
        LOGGER.info("Aggregation Operations: " + operations);
        Aggregation aggregation = Aggregation.newAggregation(operations);

        AggregationResults<LabData> res = mongoTemplate.aggregate(aggregation, LabData.class, LabData.class);

        // Logging the results of the aggregation
        LOGGER.info("Aggregation Results: " + res.getMappedResults());
        return res.getMappedResults();
    }
}
