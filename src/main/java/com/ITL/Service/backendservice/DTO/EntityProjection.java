package com.ITL.Service.backendservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class EntityProjection {
    private String region;
    private String country;
    private String locationCode;
    private String entityName;
}
