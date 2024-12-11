package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.LabData;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@EnableMongoRepositories
public interface LabDataRepo extends MongoRepository<LabData, ObjectId>,CustomLabDataRepo {

    boolean deleteBySeqId(String id);
    boolean existsBySeqId(String id);
    LabData findBySeqId(String id);

    @Query("{'entityName' :  ?0, 'gb' :  ?1}")
    List<LabData> findLabDataByEntityNameAndGb(String entityName, String gb);
    @Query("{'locationCode' : ?0, 'entityName' :  ?1, 'local_itl':  ?2, 'labNo' : ?3, 'primary_lab_cord' : ?4, 'dep_name': ?5, }")
    LabData findLabDataByLocationCodeAndEntityNameAndGbAndLabNoAndPrimary_lab_cordAndDep_name(String locationCode, String entityName, String local_itl, String labNo,String primary_lab_cord, String dep_name);
    @Query("{'primary_lab_cord' : ?0}")
    List<LabData> findByPrimary_lab_cord(String primary_lab_cord);
    @Query("{'local_itl' : ?0}")
    List<LabData> findByLocal_itl(String local_itl);
    @Query("{'local_itl_proxy' : ?0}")
    List<LabData> findByLocal_itl_proxy(String local_itl_proxy);


    @Query("{ $or: [ { 'primary_lab_cord': { $regex: ?0, $options: 'i' } }, { 'dh': { $regex: ?0, $options: 'i' } }, { 'kam': { $regex: ?0, $options: 'i' } },{ 'local_itl': { $regex: ?0, $options: 'i' } },{ 'local_itl_proxy': { $regex: ?0, $options: 'i' } },{ 'secondary_lab_cord': { $regex: ?0, $options: 'i' } } ] }")
    List<LabData> findByLabResponsibleIgnoreCase(String userId);


    //code for role management
    @Aggregation(pipeline = {
            "{ $group: { _id: '$primary_lab_cord' } }",
            "{ $project: { _id: 0, labcordinator: '$_id' } }"
    })
    List<String> findDistinctlabcordinators();
}
