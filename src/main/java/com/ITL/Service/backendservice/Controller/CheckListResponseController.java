package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.CheckList;
import com.ITL.Service.backendservice.Model.CheckListResponse;
import com.ITL.Service.backendservice.DTO.CheckListResponseDTO;
import com.ITL.Service.backendservice.Service.CheckListResponseService;
import com.ITL.Service.backendservice.Service.CheckListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/checklist-response")
public class CheckListResponseController {

    @Autowired
    private CheckListResponseService checkListResponseService;

    @Autowired
    private CheckListService checkListService;  // Service to retrieve CheckList by questionId

    // Endpoint to save the user's response
    @PostMapping("/add")
    public CheckListResponse addResponse(@RequestBody CheckListResponseDTO responseDTO) throws ParseException {
        // Retrieve the corresponding checklist question by questionId
        CheckList checkList = checkListService.getCheckListByQuestionId(responseDTO.getQuestionId());

        if (checkList == null) {
            // Handle the case where the questionId does not exist
            throw new RuntimeException("Checklist question not found for questionId: " + responseDTO.getQuestionId());
        }

        // Create and save the response
        return checkListResponseService.saveResponse(
                checkList,
                responseDTO.getExplanation(),
                responseDTO.getMeasures(),
                responseDTO.getResponsible(),
                responseDTO.getStatus(),
                responseDTO.getDueDate(),
                responseDTO.getFulfillmentStatus()
        );
    }
}
