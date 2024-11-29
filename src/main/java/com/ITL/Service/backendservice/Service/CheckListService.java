package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.CheckList;
import com.ITL.Service.backendservice.Repository.CheckListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CheckListService {

    @Autowired
    private CheckListRepo checklistRepository;

    private int nextQuestionId;  // This will store the next available question_id
    public CheckList getCheckListByQuestionId(Integer questionId) {
        return checklistRepository.findByQuestionId(questionId);  // This will fetch the checklist by questionId
    }

    // Initialize nextQuestionId based on the max questionId found in the database
    @PostConstruct
    public void init() {
        resetNextQuestionId();  // Initial call to set the next question_id
    }

    // Method to reset nextQuestionId based on the max ID found in the database
    private void resetNextQuestionId() {
        List<CheckList> checkLists = checklistRepository.findAll();

        // If the list is empty, set nextQuestionId to 1, else find the max questionId and increment it
        if (checkLists.isEmpty()) {
            nextQuestionId = 1;
        } else {
            nextQuestionId = checkLists.stream()
                    .map(CheckList::getQuestionId)  // Get all questionIds
                    .max(Comparator.naturalOrder())  // Find the maximum questionId
                    .orElse(0) + 1;  // Default to 1 if no questionIds are found
        }
    }

    // Save questions and generate unique questionId
    public List<CheckList> addQuestions(List<String> questions) {
        List<CheckList> newCheckLists = questions.stream()
                .map(question -> new CheckList(nextQuestionId++, question))  // Generate unique questionId
                .collect(Collectors.toList());

        checklistRepository.saveAll(newCheckLists);  // Save all questions at once to the repository
        return newCheckLists;
    }
    public CheckListResponse saveCheckListResponse(CheckListResponse response) {
        CheckListResponse savedResponse = checkListResponseRepository.save(response);
        CheckList checkList = checkListRepository.findByQuestionId(response.getQuestionId());
        if (checkList == null) {
            throw new RuntimeException("Question not found");
        }
        checkList.addResponse(savedResponse);
        checkListRepository.save(checkList);
        return savedResponse;
    }


    // Fetch all questions from the database
    public List<CheckList> getAllQuestions() {
        return checklistRepository.findAll();  // This fetches all CheckList objects from the repository
    }
    public List<Integer> getAllQuestionIds() {
        return checklistRepository.findAll().stream()
                .map(CheckList::getQuestionId)  // Extract questionId from each CheckList
                .collect(Collectors.toList());  // Collect them into a list
    }

    // Method to delete all questions and reset nextQuestionId
    public void deleteAllQuestions() {
        checklistRepository.deleteAll();  // Delete all questions from the repository
        resetNextQuestionId();  // Recalculate nextQuestionId
    }

    // Method to delete a specific question by questionId
    public void deleteQuestion(Integer questionId) {
        checklistRepository.findAll()
                .stream()
                .filter(checkList -> checkList.getQuestionId().equals(questionId))  // Find question by ID
                .findFirst()
                .ifPresent(checkList -> {
                    checklistRepository.delete(checkList);  // Delete the question
                    resetNextQuestionId();  // Recalculate nextQuestionId after deletion
                });
    }
}