package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.CheckList;
import com.ITL.Service.backendservice.Model.CheckListResponse;
import com.ITL.Service.backendservice.Service.CheckListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/checklist")
@RequiredArgsConstructor
public class CheckListController {

    private final CheckListService checkListService;

    // Endpoint to add new checklist questions
    @PostMapping("/add")
    public List<CheckList> addChecklistQuestions(@RequestBody List<String> questions) {
        return checkListService.addQuestions(questions);
    }

    @GetMapping("/ids")
    public List<Integer> getAllQuestionIds() {
        return checkListService.getAllQuestionIds();   // Fetch the questionIds from service and return
    }
    // Endpoint to get all questions
    @GetMapping("/")
    public List<CheckList> getAllQuestions() {
        return checkListService.getAllQuestions();  // This calls the getAllQuestions() method in the service
    }

    // Endpoint to delete all questions and reset questionId sequence
    @DeleteMapping("/deleteAll")
    public void deleteAllQuestions() {
        checkListService.deleteAllQuestions();
    }

    // Endpoint to delete a specific question by questionId
    @DeleteMapping("/delete/{questionId}")
    public void deleteQuestion(@PathVariable Integer questionId) {
        checkListService.deleteQuestion(questionId);
    }


    @PostMapping("/responses")
    public ResponseEntity<Void> addCheckListResponses(@RequestBody List<CheckListResponse> responses) {
        for (CheckListResponse response : responses) {
            checkListService.saveCheckListResponse(response);
        }
        return ResponseEntity.ok().build();
    }

}

