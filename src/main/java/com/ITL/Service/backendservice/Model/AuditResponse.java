package com.ITL.Service.backendservice.Model;

import lombok.Data;

import java.util.Date;

@Data
public class AuditResponse {
    private String questionId;
    private String fulfillmentStatus;
    private String explanation;
    private String measures;
    private Date dueDate;
    private String responsible;
    private String status;
}
