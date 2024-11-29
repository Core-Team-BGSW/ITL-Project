package com.ITL.Service.backendservice.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
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
}
