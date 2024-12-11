package com.ITL.Service.backendservice.Model;

import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.List;

public class LabquestionResponse {
    @Id
    private String id;

    private int questionId; // Maps each response to a specific question
    private List<String> headCount;
    private String itDevice;
    @Setter
    private List<String> dependancy;
    @Setter
    private List<String> wan;
    private List<String> test;
    private String downtime;
    private List<String> criticalTest;
    private List<String> trial;
    private List<String> lan;
    private String confidentiality;

    // Getters and Setters
    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public List<String> getHeadCount() {
        return headCount;
    }

    public void setHeadCount(List<String> headCount) {
        this.headCount = headCount;
    }

    public String getItDevice() {
        return itDevice;
    }

    public void setItDevice(String itDevice) {
        this.itDevice = itDevice;
    }

    public List<String> getDependancy() {
        return dependancy;
    }

    public List<String> getWan() {
        return wan;
    }

    public List<String> getTest() {
        return test;
    }

    public void setTest(List<String> test) {
        this.test = test;
    }

    public String getDowntime() {
        return downtime;
    }

    public void setDowntime(String downtime) {
        this.downtime = downtime;
    }

    public List<String> getCriticalTest() {
        return criticalTest;
    }

    public void setCriticalTest(List<String> criticalTest) {
        this.criticalTest = criticalTest;
    }

    public List<String> getTrial() {
        return trial;
    }

    public void setTrial(List<String> trial) {
        this.trial = trial;
    }

    public List<String> getLan() {
        return lan;
    }

    public void setLan(List<String> lan) {
        this.lan = lan;
    }

    public String getConfidentiality() {
        return confidentiality;
    }

    public void setConfidentiality(String confidentiality) {
        this.confidentiality = confidentiality;
    }
}

