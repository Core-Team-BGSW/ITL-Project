package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.AuditResponseFinal;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AuditResponseRepository extends MongoRepository<AuditResponseFinal, String> {
    AuditResponseFinal findByUserId(String userId);
}
