package com.ITL.Service.backendservice.Repository;

import com.ITL.Service.backendservice.Model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


//    public List<Question> findAll() {
//        return List.of();
//    }
//
//    public Question save(Question question) {
//        return question;
//    }
//
//    public int count() {
//        return 0;
//    }
//
//    public void saveAll(List<Question> questions) {
//    }

    public interface QuestionRepository extends MongoRepository<Question, String> {
        // Additional query methods can be defined here if needed
//        Question findByQuestionId(String questionId);
        Optional<Question> findByQuestionId(int questionId);
    }

