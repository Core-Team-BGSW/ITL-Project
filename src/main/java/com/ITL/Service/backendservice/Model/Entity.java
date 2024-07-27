package com.ITL.Service.backendservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection="entity")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Entity {
    @Id
    private String id;
    private String region;
    private String country;
    private String location;
    private String locationCode;
    private String entityName;
    @DBRef
    private List<LabData> labDataList = new ArrayList<>();
}
