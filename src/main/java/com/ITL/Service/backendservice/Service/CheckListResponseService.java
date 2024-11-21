package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.CheckListResponse;
import com.ITL.Service.backendservice.Repository.CheckListResponseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CheckListResponseService {

    @Autowired
    private CheckListResponseRepo checkListResponseRepo;

    // Save responses to the checklist_response collection
    public CheckListResponse saveResponse(CheckListResponse response) {
        return checkListResponseRepo.save(response);
    }

    // Retrieve all responses for a given question
    public List<CheckListResponse> getResponsesByQuestionId(Integer questionId) {
        return checkListResponseRepo.findAll();  // Modify this as needed (e.g., custom query)
    }

    // Optionally, delete responses (e.g., by questionId or user)
    public void deleteResponse(String responseId) {
        checkListResponseRepo.deleteById(responseId);
    }
}
