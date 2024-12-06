package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.Questiondynamic;
import com.ITL.Service.backendservice.Service.DynamicquestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "http://localhost:4200")
public class DynamicQController {
    @Autowired
    private DynamicquestionService dynamicquestionService;
    @PostMapping
    public Questiondynamic addQ(@RequestBody Questiondynamic questiondynamic){
        return dynamicquestionService.saveQuestion(questiondynamic);
    }
//    @GetMapping
//    public List <Questiondynamic> getAllQuestions(){
//        return dynamicquestionService.getAllQuestions();
//    }

}
