package com.ITL.Service.backendservice.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Data
@Document(collection = "question_response_ashraf")
public class AuditResponseFinal {
    @Id
    private String id;
    private String userId; // Add a unique user identifier
    private List<AuditResponse> responses;

}
