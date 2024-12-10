package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.Permissions;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RolePermissionRepo extends MongoRepository<Permissions, String>{
    Optional<Permissions> findByRole(String role);
    List<Permissions> findAll();

}
