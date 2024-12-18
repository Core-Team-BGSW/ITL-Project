package com.ITL.Service.backendservice.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "questions_Ashraf")
public class AuditQuestions {

    @Id
    private String id;
    private String section;
    private String questionId;
    private String text;
    private String hint;
    private String evaluation;

}
