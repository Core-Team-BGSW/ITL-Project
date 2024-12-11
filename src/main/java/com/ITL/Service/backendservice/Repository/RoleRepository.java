package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.Roles;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface RoleRepository extends MongoRepository<Roles, String> {
    Roles findByUserId(String userId);

    @Query("{ 'userId': { $regex: ?0, $options: 'i' } }")
    Optional<Roles> findByUserIdIgnoreCase(String userId);

    boolean existsByUserId(String userId);


    @Query(value = "{'_id': { $regex: '^?0', $options: 'i' }}", fields = "{'_id': 1}")
    List<String> findUserIdsByPrefix(String prefix);
}

