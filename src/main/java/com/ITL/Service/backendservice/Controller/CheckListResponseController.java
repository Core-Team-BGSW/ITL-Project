package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.CheckListResponse;
import com.ITL.Service.backendservice.Service.CheckListResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/checklistResponse")
public class CheckListResponseController {

    @Autowired
    private CheckListResponseService checkListResponseService;

    // Submit a response for a checklist question
    @PostMapping("/add")
    public CheckListResponse addResponse(@RequestBody CheckListResponse response) {
        return checkListResponseService.saveResponse(response);
    }

    // Get all responses for a specific question ID
    @GetMapping("/question/{questionId}")
    public List<CheckListResponse> getResponsesByQuestionId(@PathVariable Integer questionId) {
        return checkListResponseService.getResponsesByQuestionId(questionId);
    }

    // Delete a specific response by ID
    @DeleteMapping("/delete/{responseId}")
    public void deleteResponse(@PathVariable String responseId) {
        checkListResponseService.deleteResponse(responseId);
    }
}
