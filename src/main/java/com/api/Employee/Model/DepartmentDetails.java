package com.api.Employee.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class DepartmentDetails {
    private String orgOfficeId;
    @JsonProperty("name")
    private String departmentName;
    private String abbreviation;
    private String type;

    // Getters and Setters
}
