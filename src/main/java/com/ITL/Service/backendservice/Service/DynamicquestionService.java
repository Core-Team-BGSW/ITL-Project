package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.Questiondynamic;
import com.ITL.Service.backendservice.Repository.QuesdynamicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DynamicquestionService{

    @Autowired
    private QuesdynamicRepository quesdynamicRepository;
    public Questiondynamic saveQuestion(Questiondynamic question) {
        return quesdynamicRepository.save(question);
    }

    public List<Questiondynamic> getAllQuestions() {
        return quesdynamicRepository.findAll();
    }
}
