package com.ITL.Service.backendservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="locationData")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocationData {
    public String region;
    public String country;
    public String locationCode;
}
