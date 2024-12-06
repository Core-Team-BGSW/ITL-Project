package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.ConsolidatedResponse;
import com.ITL.Service.backendservice.Model.Response;
import com.ITL.Service.backendservice.Service.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/responses")
public class ResponseController {
    @Autowired
    private ResponseService responseService;

    // Get all responses in the desired format
//    @GetMapping("/all")
//    public ResponseEntity<Map<String, Object>> getAllResponses() {
//        Map<String, Object> responses = responseService.getAllResponses();
//        return ResponseEntity.ok(responses);
//    }
//    @PostMapping("/saveAll")
//    public ResponseEntity<List<Response>> saveResponses(@RequestBody List<Response> responses) {
//        List<Response> savedResponses = responseService.saveResponses(responses);
////        Response savedResponse = responseService.saveResponses(response);
//        return ResponseEntity.status(HttpStatus.CREATED).body(savedResponses);
//    }
    @PostMapping("/consolidate")
    public ResponseEntity<Map<String, Object>> consolidateResponses(@RequestBody List<Response> responses) {
        Map<String, Object> result = responseService.saveConsolidatedResponses(responses);
//        return ResponseEntity.ok(consolidatedResponses);
        return ResponseEntity.ok(result);
    }
}
//    @GetMapping("/all")
//    public ResponseEntity<Map<String, Object>> getAllResponses() {
//        Map<String, Object> responses = responseService.saveConsolidatedResponses();
//        return ResponseEntity.ok(responses);
//    }
//}
//
