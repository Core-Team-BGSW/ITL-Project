package com.ITL.Service.backendservice.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "checklist_response")  // MongoDB collection name
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
    public CheckListResponse() {}

    public CheckListResponse(Integer questionId, String response, String explanation, String measure, String responsible, String dueDate, String status) {
        this.questionId = questionId;
        this.response = response;
        this.explanation = explanation;
        this.measure = measure;
        this.responsible = responsible;
        this.dueDate = dueDate;
        this.status = status;
    }

    // Getters and Setters for all fields
    // ... (existing getters and setters)

    // Custom validation logic to conditionally set fields based on the response
    public void validateFields() {
        if ("completely fulfilled".equalsIgnoreCase(this.response)) {
            // If the response is "completely fulfilled", clear unnecessary fields
            this.measure = null;
            this.responsible = null;
            this.dueDate = null;
            this.status = null;
        } else if ("partially fulfilled".equalsIgnoreCase(this.response) || "not fulfilled".equalsIgnoreCase(this.response)) {
            // If the response is "partially fulfilled" or "not fulfilled", ensure all fields are populated
            if (this.explanation == null || this.explanation.isEmpty()) {
                throw new IllegalArgumentException("Explanation is required for partially or not fulfilled responses.");
            }
        }
    }

    @Override
    public String toString() {
        return "CheckListResponse{" +
                "id='" + id + '\'' +
                ", questionId=" + questionId +
                ", response='" + response + '\'' +
                ", explanation='" + explanation + '\'' +
                ", measure='" + measure + '\'' +
                ", responsible='" + responsible + '\'' +
                ", dueDate='" + dueDate + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
