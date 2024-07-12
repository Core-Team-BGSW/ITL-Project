package com.ITL.Service.backendservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "lab_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LabData {
    @Id
    private String sr_no;
    private String gb;
    private String local_itl;
    private String entityName;
    private String local_itl_proxy;
    private String dh;
    private String kam;
    private String dep_name;
    private String building;
    private String floor;
    private String labNo;
    private String primary_lab_cord;
    private String secondary_lab_cord;
    private String cost_center;
    private String kind_of_lab;
    private String purpose_of_lab;
    private String description;
    private String new_equipment;
    private String shared_lab;
    private String acl_req;
    private String green_ports;
    private String yellow_ports;
    private String red_ports;
}

