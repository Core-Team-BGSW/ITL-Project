package com.ITL.Service.backendservice.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import java.util.List;

@Document(collection = "lab_checklist") // MongoDB collection name
public class CheckList {

    @Id
    private ObjectId id;  // MongoDB ID (this will be automatically managed by MongoDB)

    private Integer questionId;  // Unique question ID
    private String question;  // The actual checklist question

    @DBRef  // Reference to CheckListResponse (not embedding it)
    private List<CheckListResponse> responses;  // List of references to responses

    // Constructors, Getters, and Setters
    public CheckList() {}

    public CheckList(Integer questionId, String question) {
        this.questionId = questionId;
        this.question = question;
    }

    // Getter and Setter for questionId
    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    // Getter and Setter for id (MongoDB ID)
    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    // Getter and Setter for question
    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    // Getter and Setter for responses
    public List<CheckListResponse> getResponses() {
        return responses;
    }

    public void setResponses(List<CheckListResponse> responses) {
        this.responses = responses;
    }
}
