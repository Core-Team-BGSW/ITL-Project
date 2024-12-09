package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.LabquestionResponse;
import com.ITL.Service.backendservice.Service.LabquestionresponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/responses")
public class LabquestionResponseController {
    @Autowired
    private LabquestionresponseService responseService;
    @PostMapping("/consolidate")
    public ResponseEntity<Map<String, Object>> consolidateResponses(@RequestBody List<LabquestionResponse> responses) {
        Map<String, Object> result = responseService.saveConsolidatedResponses(responses);
//        return ResponseEntity.ok(consolidatedResponses);
        return ResponseEntity.ok(result);
    }
}

