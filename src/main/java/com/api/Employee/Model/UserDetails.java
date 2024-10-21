package com.api.Employee.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserDetails {
    private String firstName;
    private String lastName;
    private String userId;
    private String email;
    private String phone;
    private String orgOfficeId;
    @JsonProperty("orgOffice")
    private String department;
    private String costCenter;
    private String targetManagerUserId;
    private String location;
    private boolean headOfOwnOrgOffice;
    @JsonProperty("juper")
    private String entity;


    // Getters and Setters
}
