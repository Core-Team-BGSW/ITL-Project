package com.ITL.Service.backendservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "NewUser") // MongoDB collection name
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewUser {

    @Id
    private String id; // Use String (MongoDB ObjectId) as ID type
    private String NTId;
    private String name;
    private String department;
    private String entityName;
    private String role;

    // List to store multiple lab details
    private List<LabDetails> labDetails;

    // Inner class to represent lab details
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LabDetails {
        private String location;
        private String building;
        private String lab_no;
    }

    // Constructor with fields
    public NewUser(String name, String department) {
        this.NTId = NTId;
        this.name = name;
        this.department = department;
    }
}
