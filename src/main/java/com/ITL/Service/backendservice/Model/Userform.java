package com.ITL.Service.backendservice.Model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "userdata")
public class Userform {
    private String id; // MongoDB auto-generated ID
    private String ntid;
    private String email;
    private String password;

    // Constructors, Getters, and Setters
    public Userform() {}

    public Userform(String ntid, String email, String password) {
        this.ntid = ntid;
        this.email = email;
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return ntid;
    }

    public void setNtid(String ntid) {
        this.ntid = ntid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
