package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.CheckList;
import com.ITL.Service.backendservice.Model.CheckListResponse;
import com.ITL.Service.backendservice.Service.CheckListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/checklist")
@RequiredArgsConstructor
public class CheckListController {

    private final CheckListService checkListService;

    // Endpoint to add new checklist questions
    @PostMapping("/add")
    public List<CheckList> addChecklistQuestions(@RequestBody AddQuestionRequest request) {
        // Extract the question-tooltip pairs from the request
        List<String> questions = request.getQuestionTooltipPairs().stream()
                .map(AddQuestionRequest.QuestionTooltipPair::getQuestion)
                .collect(Collectors.toList());

        List<String> tooltips = request.getQuestionTooltipPairs().stream()
                .map(AddQuestionRequest.QuestionTooltipPair::getTooltip)
                .collect(Collectors.toList());

        // Call the service to save the questions and tooltips
        return checkListService.addQuestions(questions, tooltips);
    }


    @GetMapping("/ids")
    public List<Integer> getAllQuestionIds() {
        return checkListService.getAllQuestionIds();   // Fetch the questionIds from service and return
    }
    // Endpoint to get all questions
    @GetMapping("/fetchAll")
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
//    @PutMapping("/tooltip/{questionId}")
//    public ResponseEntity<CheckList> updateTooltip(@PathVariable Integer questionId, @RequestBody String tooltip) {
//        CheckList updatedCheckList = checkListService.updateTooltip(questionId, tooltip);
//        return ResponseEntity.ok(updatedCheckList);
//    }

    @PostMapping("/responses")
    public ResponseEntity<Void> addCheckListResponses(@RequestBody List<CheckListResponse> responses) {
        for (CheckListResponse response : responses) {
            checkListService.saveCheckListResponse(response);
        }
        return ResponseEntity.ok().build();
    }
    public static class AddQuestionRequest {
        private List<QuestionTooltipPair> questionTooltipPairs; // A list of question-tooltip pairs

        // Getter and setter
        public List<QuestionTooltipPair> getQuestionTooltipPairs() {
            return questionTooltipPairs;
        }

        public void setQuestionTooltipPairs(List<QuestionTooltipPair> questionTooltipPairs) {
            this.questionTooltipPairs = questionTooltipPairs;
        }

        // Inner class to represent a question and its tooltip
        public static class QuestionTooltipPair {
            private String question;
            private String tooltip;

            // Getters and setters
            public String getQuestion() {
                return question;
            }

            public void setQuestion(String question) {
                this.question = question;
            }

            public String getTooltip() {
                return tooltip;
            }

            public void setTooltip(String tooltip) {
                this.tooltip = tooltip;
            }
        }
    }

}