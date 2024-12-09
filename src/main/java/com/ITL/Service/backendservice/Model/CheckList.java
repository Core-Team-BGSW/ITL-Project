package com.ITL.Service.backendservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "lab_checklist") // MongoDB collection name
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckList {

    @Id
    private ObjectId id;  // MongoDB ID (this will be automatically managed by MongoDB)

    private Integer questionId;  // Unique question ID
    private String question;  // The actual checklist question
    private String tooltip;

    @DBRef
    private List<CheckListResponse> responses = new ArrayList<>();  // Reference to CheckListResponse (not embedding it)

    public CheckList(Integer questionId, String question, String tooltip) {
        this.questionId = questionId;
        this.question = question;
        this.tooltip = tooltip;
    }

//    public void addResponse(CheckListResponse response) {
//        this.responses.add(response);
//    }
}
 