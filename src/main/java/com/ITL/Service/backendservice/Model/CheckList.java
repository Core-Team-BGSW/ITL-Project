package com.ITL.Service.backendservice.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "lab_checklist")  // MongoDB collection name
public class CheckList {

    @Id
    private Integer id;  // Ensure this is Integer, not String

    private String question;  // The question text

    // Constructors, Getters, and Setters
    public CheckList() {}

    public CheckList(Integer id, String question) {
        this.id = id;
        this.question = question;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
