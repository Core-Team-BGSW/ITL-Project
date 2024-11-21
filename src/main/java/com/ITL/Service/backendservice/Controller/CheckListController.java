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

    @PostMapping("/add")
    public List<CheckList> addChecklistQuestions(@RequestBody List<String> questions) {
        return checklistService.addQuestions(questions);
    }

    @GetMapping("/")
    public List<CheckList> getAllQuestions() {
        return checklistService.getAllQuestions();
    }

    // New endpoint to delete all questions
    @DeleteMapping("/deleteAll")
    public void deleteAllQuestions() {
        checklistService.deleteAllQuestions();
    }

    // Endpoint to delete a specific question by ID
    @DeleteMapping("/delete/{id}")
    public void deleteQuestion(@PathVariable Integer id) {
        checklistService.deleteQuestion(id);
    }
}