package com.ITL.Service.backendservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckListResponseDTO {

    private Integer questionId;
    private String explanation;
    private String measures;
    private String responsible;
    private String status;
    private String dueDate;
    private String fulfillmentStatus; // Add fulfillmentStatus here
}