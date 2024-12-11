package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.DTO.EntityNameResult;
import com.ITL.Service.backendservice.DTO.GbResult;
import com.ITL.Service.backendservice.Model.LabData;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class CustomLabDataRepoImpl implements CustomLabDataRepo{
    private final MongoTemplate mongoTemplate;

    // labName,departement,secondary lab coord.
    public ResponseEntity<String> deleteByCustomQuery(String query) {
        Query queryRes = searchForDelete(query);
        if(queryRes == null)
        {
            return ResponseEntity.ok("The primary lab coordinator is invalid please enter valid lab coordinator Id");
        }
        List<LabData> labDataList = mongoTemplate.find(queryRes,LabData.class);
        if(labDataList.size() == 1) {
            mongoTemplate.remove(queryRes, LabData.class);
            return ResponseEntity.ok("The lab data with given Primary Lab Coordinator is deleted successfully");
        }
        return ResponseEntity.ok("There is no such labs which are related to your query");
    }

    @Override
    public List<String> findUniqueGB() {
        GroupOperation groupByGb = Aggregation.group("gb");
        Aggregation aggregation = Aggregation.newAggregation(groupByGb);

        AggregationResults<GbResult> results = mongoTemplate.aggregate(aggregation, "lab_data", GbResult.class);
        return results.getMappedResults().stream()
                .map(GbResult::getId)
                .collect(Collectors.toList());
    }


    @Override
    public List<String> findUniqueEntity() {
        GroupOperation groupByEntityName = Aggregation.group("entityName");
        Aggregation aggregation = Aggregation.newAggregation(groupByEntityName);

        AggregationResults<EntityNameResult> results = mongoTemplate.aggregate(aggregation, "lab_data", EntityNameResult.class);
        return results.getMappedResults().stream()
                .map(EntityNameResult::getId)
                .collect(Collectors.toList());
    }

    @Override
    public List<LabData> search(String query) {
        String[] searchTerms = query.split(" ");
        Query searchQuery = findLabDataWithCustomQuery(searchTerms);
        return mongoTemplate.find(searchQuery, LabData.class);
    }

    public Query searchForDelete(String query)
    {
        String[] searchTerms = query.split(" ");
        return findLabDataWithCustomQuery(searchTerms);
    }

    private Query findLabDataWithCustomQuery(String[] searchTerms) {
        List<Criteria> criteriaList = new ArrayList<>();
        Query searchQuery = new Query();
        for(String term : searchTerms)
        {
            criteriaList.add((new Criteria().orOperator(
                    Criteria.where("labNo").regex(term, "i"),
                    Criteria.where("dep_name").regex(term, "i"),
                    Criteria.where("building").regex(term, "i"),
                    Criteria.where("cost_center").regex(term,"i"),
                    Criteria.where("primary_lab_cord").regex(term,"i"),
                    Criteria.where("secondary_lab_cord").regex(term,"i"),
                    Criteria.where("local_itl").regex(term,"i"),
                    Criteria.where("kind_of_lab").regex(term,"i"),
                    Criteria.where("locationCode").regex(term,"i"),
                    Criteria.where("local_itl_proxy").regex(term,"i"),
                    Criteria.where("dh").regex(term,"i"),
                    Criteria.where("kam").regex(term,"i"),
                    Criteria.where("kind_of_lab").regex(term,"i"),
                    Criteria.where("self_audit_date").regex(term,"i")
            )));
        }
        searchQuery.addCriteria(new Criteria().orOperator(criteriaList.toArray(new Criteria[0])));
        return searchQuery;
    }
}
