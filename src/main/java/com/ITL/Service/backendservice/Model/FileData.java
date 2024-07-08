package com.ITL.Service.backendservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "file_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileData {
    @Id
    private String sr_no;
    private String region;
    private String country;
    private String location;
    private String location_code;
    private String entity;
    private String gb;
    private String local_itl;
    private String local_itl_proxy;
    private String dh;
    private String kam;
    private String dep_name;
    private String building;
    private String floor;
    private String lab_no;
    private String cost_center;
    private String lab_responsible_NTID_primary;
    private String lab_responsible_NTID_secondary;
    private Boolean acl_implemented;
}

