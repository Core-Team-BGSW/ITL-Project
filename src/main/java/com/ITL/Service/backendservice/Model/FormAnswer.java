package com.ITL.Service.backendservice.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "form_answers")
public class FormAnswer {
    @Id
    private String id;
    private String userId;

    private SectionA sectionA;


    // Getters and setters..
    @Data
    public static class SectionA {
        private List<String> externalandinternalassociatescount;
        private String itDevice;
        private List<String>dependancy;
        private List<String>wan;
        private List<String>test;
        private String downtime;
        private List<String>criticalTest;
        private List<String>trial;
        private List<String>lan;
        private String confidentiality;
    }
}
