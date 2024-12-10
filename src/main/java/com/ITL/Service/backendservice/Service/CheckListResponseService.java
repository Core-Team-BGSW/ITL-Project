package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.CheckList;
import com.ITL.Service.backendservice.Model.CheckListResponse;
import com.ITL.Service.backendservice.Repository.CheckListRepo;
import com.ITL.Service.backendservice.Repository.CheckListResponseRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;

@Service
@RequiredArgsConstructor
public class CheckListResponseService {

    private final CheckListResponseRepo checkListResponseRepo;
    private final CheckListRepo checkListRepo;

    // Save the user's response
    public CheckListResponse saveResponse(CheckList checkList, String explanation, String measures, String responsible, String status, String dueDate, String fulfillmentStatus) throws ParseException {
        CheckListResponse response = new CheckListResponse();
        // Set the questionId from CheckList
        response.setQuestionId(checkList.getQuestionId());

        // Always set the fulfillment status
        response.setFulfillmentStatus(fulfillmentStatus); // Ensure that fulfillmentStatus is saved

        if ("completely-fulfilled".equals(fulfillmentStatus)) {
            // Only explanation is saved
            response.setExplanation(explanation);
            response.setMeasures(null);  // measures will be null in case of "completely-fulfilled"
            response.setResponsible(null);
            response.setDueDate(null);
            response.setStatus(null);
        } else {
            // For "partially-fulfilled" or "not-fulfilled", save all fields
            response.setExplanation(explanation);
            response.setMeasures(measures);
            response.setResponsible(responsible);

            if (dueDate != null && !dueDate.isEmpty()) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                response.setDueDate(sdf.parse(dueDate)); // Convert date string to Date object
            }

            response.setStatus(status);
        }
        checkListResponseRepo.save(response);
        checkList.getResponses().add(response);
        checkListRepo.save(checkList);
        return response;
    }
}