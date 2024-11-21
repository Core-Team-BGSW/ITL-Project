package com.ITL.Service.backendservice.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "checklist_response")
public class CheckListResponse {

    @Id
    private String id;  // Unique ID for the response
    private Integer questionId;  // ID of the checklist question
    private String response;  // User's response (completely fulfilled, partially fulfilled, not fulfilled)
    private String explanation;  // Explanation (required for "partially fulfilled" or "not fulfilled")
    private String measure;  // Additional field for "partially fulfilled" or "not fulfilled"
    private String responsible;  // Additional field for "partially fulfilled" or "not fulfilled"
    private String dueDate;  // Additional field for "partially fulfilled" or "not fulfilled"
    private String status;  // Additional field for "partially fulfilled" or "not fulfilled"

    // Constructors, Getters, and Setters

    public CheckListResponse() {
    }

    public CheckListResponse(Integer questionId, String response, String explanation, String measure, String responsible, String dueDate, String status) {
        this.questionId = questionId;
        this.response = response;
        this.explanation = explanation;
        this.measure = measure;
        this.responsible = responsible;
        this.dueDate = dueDate;
        this.status = status;
    }

    // Getters and Setters for all fields...
}
