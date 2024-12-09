package com.ITL.Service.backendservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "checklist_response")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckListResponse {

    @Id
    private String id;  // MongoDB's default ObjectId

    private Integer questionId;  // The unique questionId from CheckList, referencing the question
    private String explanation;
    private String measures;
    private String responsible;
    private String status;
    private Date dueDate;  // Use Date type for dueDate
    private String fulfillmentStatus;  // Store fulfillmentStatus here
}