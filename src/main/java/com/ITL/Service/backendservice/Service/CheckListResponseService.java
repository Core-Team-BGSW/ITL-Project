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
        System.out.println("Saving response: " + response);  // Log the response
        response.validateFields(); // Validate fields
        CheckListResponse savedResponse = checkListResponseRepo.save(response);
        System.out.println("Saved response: " + savedResponse);  // Log the saved response
        return savedResponse;
    }

    // Retrieve all responses for a given question
    public List<CheckListResponse> getResponsesByQuestionId(Integer questionId) {
        System.out.println("Fetching responses for question ID: " + questionId); // Debugging log
        return checkListResponseRepo.findAll();  // Modify this as needed (e.g., custom query)
    }

    // Optionally, delete responses (e.g., by questionId or user)
    public void deleteResponse(String responseId) {
        System.out.println("Deleting response with ID: " + responseId); // Debugging log
        checkListResponseRepo.deleteById(responseId);
    }
}
