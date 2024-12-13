package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.NewUser;
import com.ITL.Service.backendservice.Repository.NewUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NewUserService {

    private final NewUserRepo userRepository; // Constructor injection via Lombok

    // Save a new user
    public NewUser saveUser(NewUser user) {
        return userRepository.save(user); // Saves the NewUser with labDetails
    }

    // Get all users
    public List<NewUser> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public Optional<NewUser> getUserById(String userId) {
        return userRepository.findById(userId);
    }

    // Delete user by ID
    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }
}
