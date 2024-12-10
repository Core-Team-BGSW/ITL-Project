package com.ITL.Service.backendservice.Model;

import lombok.Data;

import java.util.List;

@Data
public class UserPermissionsResponse {
    private List<String> roles;
    private List<String> permissions;

    // Constructors, Getters, and Setters
    public UserPermissionsResponse(List<String> roles, List<String> permissions) {
        this.roles = roles;
        this.permissions = permissions;
    }
}
