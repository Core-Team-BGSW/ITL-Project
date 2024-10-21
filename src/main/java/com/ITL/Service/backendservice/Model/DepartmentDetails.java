package com.ITL.Service.backendservice.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class DepartmentDetails {
    private String orgOfficeId;
    @JsonProperty("name")
    private String departmentName;
    private String abbreviation;
    private String type;
}
