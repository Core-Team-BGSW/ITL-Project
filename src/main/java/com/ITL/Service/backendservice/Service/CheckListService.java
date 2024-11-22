package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.CheckList;
import com.ITL.Service.backendservice.Repository.CheckListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class CheckListService {

    @Autowired
    private CheckListRepo checklistRepository;

    private int nextId;

    // Initialize nextId based on the max ID found in the database, or set it to 1 if no entries exist.
    @PostConstruct
    public void init() {
        resetNextId();  // Initial call to set the nextId
    }

    private void resetNextId() {
        // Fetch all CheckLists from the repository
        List<CheckList> checkLists = checklistRepository.findAll();

        // Check if the collection is empty and reset nextId to 1, otherwise find the max ID and increment it
        if (checkLists.isEmpty()) {
            nextId = 1;  // Reset nextId to 1 if the collection is empty
        } else {
            // Get the maximum ID using Integer comparison
            nextId = checkLists.stream()
                    .map(CheckList::getId)  // Get all IDs
                    .max(Comparator.naturalOrder())  // Compare using natural order for Integers
                    .orElse(0) + 1;   // Default to 0 if no documents exist, then increment by 1
        }
    }

    // Save a list of questions
    public List<CheckList> addQuestions(List<String> questions) {
        // Create new CheckList objects with unique IDs
        List<CheckList> newCheckLists = questions.stream()
                .map(question -> new CheckList(nextId++, question)) // Increment nextId for each new question
                .toList();

        // Save all questions at once
        checklistRepository.saveAll(newCheckLists);
        return newCheckLists;
    }

    public List<CheckList> getAllQuestions() {
        return checklistRepository.findAll();
    }

    // Method to delete all questions and reset nextId to the highest ID in the database
    public void deleteAllQuestions() {
        checklistRepository.deleteAll();  // Delete all questions from the database
        resetNextId();  // Recalculate nextId based on the remaining data
    }

    // Method to delete a specific question by ID
    public void deleteQuestion(Integer id) {
        Optional<CheckList> checkList = checklistRepository.findById(id);
        if (checkList.isPresent()) {
            checklistRepository.delete(checkList.get());  // Delete the specific question by ID
            resetNextId();  // Recalculate nextId based on the remaining data
        }
    }
}
