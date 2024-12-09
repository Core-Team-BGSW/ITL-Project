package com.ITL.Service.backendservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class User {
    private String firstName;
    private String lastName;
    private String userId;
    private String email;
    private String phone;
    private String department;
    private String contractingArea;
    private String costCenter;
    private String TargetManagerID;
    private String departmentHead;
    private String Entity;
    private String location;
}
