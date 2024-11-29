package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.CheckList;
import com.ITL.Service.backendservice.Service.CheckListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/checklist")
public class CheckListController {

    @Autowired
    private CheckListService checklistService;

    // Endpoint to add new checklist questions
    @PostMapping("/add")
    public List<CheckList> addChecklistQuestions(@RequestBody List<String> questions) {
        return checklistService.addQuestions(questions);
    }

    @GetMapping("/ids")
    public List<Integer> getAllQuestionIds() {
        List<Integer> questionIds = checklistService.getAllQuestionIds();  // Fetch the questionIds from service
        return checklistService.getAllQuestionIds();   // Return the list wrapped in ResponseEntity
    }
    // Endpoint to get all questions
    @GetMapping("/")
    public List<CheckList> getAllQuestions() {
        return checklistService.getAllQuestions();  // This calls the getAllQuestions() method in the service
    }

    // Endpoint to delete all questions and reset questionId sequence
    @DeleteMapping("/deleteAll")
    public void deleteAllQuestions() {
        checklistService.deleteAllQuestions();
    }

    // Endpoint to delete a specific question by questionId
    @DeleteMapping("/delete/{questionId}")
    public void deleteQuestion(@PathVariable Integer questionId) {
        checklistService.deleteQuestion(questionId);
    }
    @PostMapping("/responses")
    public ResponseEntity<Void> addCheckListResponses(@RequestBody List<CheckListResponse> responses) {
        for (CheckListResponse response : responses) {
            checkListService.saveCheckListResponse(response);
        }
        return ResponseEntity.ok().build();
    }

}