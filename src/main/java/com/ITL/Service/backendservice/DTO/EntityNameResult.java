package com.ITL.Service.backendservice.DTO;

import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EntityNameResult {
    private String id;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CheckListRequest {

        private String question;  // The actual checklist question
        private String tooltip;   // Tooltip for the question
    }
}