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
    private String id;
    private long seqId;
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public long getSeqId() {
        return seqId;
    }

    public void setSeqId(long seqId) {
        this.seqId = seqId;
    }

    public String getGb() {
        return gb;
    }

    public void setGb(String gb) {
        this.gb = gb;
    }

    public String getLocal_itl() {
        return local_itl;
    }

    public void setLocal_itl(String local_itl) {
        this.local_itl = local_itl;
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public String getLocal_itl_proxy() {
        return local_itl_proxy;
    }

    public void setLocal_itl_proxy(String local_itl_proxy) {
        this.local_itl_proxy = local_itl_proxy;
    }

    public String getDh() {
        return dh;
    }

    public void setDh(String dh) {
        this.dh = dh;
    }

    public String getKam() {
        return kam;
    }

    public void setKam(String kam) {
        this.kam = kam;
    }

    public String getDep_name() {
        return dep_name;
    }

    public void setDep_name(String dep_name) {
        this.dep_name = dep_name;
    }

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public String getLabNo() {
        return labNo;
    }

    public void setLabNo(String labNo) {
        this.labNo = labNo;
    }

    public String getPrimary_lab_cord() {
        return primary_lab_cord;
    }

    public void setPrimary_lab_cord(String primary_lab_cord) {
        this.primary_lab_cord = primary_lab_cord;
    }

    public String getSecondary_lab_cord() {
        return secondary_lab_cord;
    }

    public void setSecondary_lab_cord(String secondary_lab_cord) {
        this.secondary_lab_cord = secondary_lab_cord;
    }

    public String getCost_center() {
        return cost_center;
    }

    public void setCost_center(String cost_center) {
        this.cost_center = cost_center;
    }

    public String getKind_of_lab() {
        return kind_of_lab;
    }

    public void setKind_of_lab(String kind_of_lab) {
        this.kind_of_lab = kind_of_lab;
    }

    public String getPurpose_of_lab() {
        return purpose_of_lab;
    }

    public void setPurpose_of_lab(String purpose_of_lab) {
        this.purpose_of_lab = purpose_of_lab;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNew_equipment() {
        return new_equipment;
    }

    public void setNew_equipment(String new_equipment) {
        this.new_equipment = new_equipment;
    }

    public String getShared_lab() {
        return shared_lab;
    }

    public void setShared_lab(String shared_lab) {
        this.shared_lab = shared_lab;
    }

    public String getAcl_req() {
        return acl_req;
    }

    public void setAcl_req(String acl_req) {
        this.acl_req = acl_req;
    }

    public String getGreen_ports() {
        return green_ports;
    }

    public void setGreen_ports(String green_ports) {
        this.green_ports = green_ports;
    }

    public String getYellow_ports() {
        return yellow_ports;
    }

    public void setYellow_ports(String yellow_ports) {
        this.yellow_ports = yellow_ports;
    }

    public String getRed_ports() {
        return red_ports;
    }

    public void setRed_ports(String red_ports) {
        this.red_ports = red_ports;
    }
}

