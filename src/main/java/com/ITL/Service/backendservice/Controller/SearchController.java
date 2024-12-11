package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.DTO.SearchResult;
import com.ITL.Service.backendservice.Service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Labs")
public class SearchController {
    private final SearchService searchService;

    @GetMapping("/search")
    public ResponseEntity<SearchResult> searchLabs(@RequestParam String query)
    {
        SearchResult results = searchService.search(query);
        if (results == null || (results.getEntities().isEmpty() && results.getLabData().isEmpty())) {
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return ResponseEntity.ok(results);
    }
}
