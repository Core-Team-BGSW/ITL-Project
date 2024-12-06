package com.ITL.Service.backendservice.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "labquestion_questions")
public class Question {
    private String id; // MongoDB will auto-generate this ID
    private Integer questionId; // Unique identifier for your question
    private String questionDescription;

    // Constructors, Getters, and Setters
    public Question() {}

    public Question(Integer questionId, String questionDescription) {
        this.questionId = questionId;
        this.questionDescription = questionDescription;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public String getQuestionDescription() {
        return questionDescription;
    }

    public void setQuestionDescription(String questionDescription) {
        this.questionDescription = questionDescription;
    }
}
