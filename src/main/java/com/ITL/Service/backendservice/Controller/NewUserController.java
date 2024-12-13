package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.NewUser;
import com.ITL.Service.backendservice.Service.NewUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List; // <-- Add this import
import java.util.Optional;


@RestController
@RequestMapping("/api/users")
public class NewUserController {

    @Autowired
    private NewUserService userService;

    // Create a new user with lab details
    @PostMapping
    public ResponseEntity<NewUser> createUser(@RequestBody NewUser newUser) {
        // Save the new user, including the lab details
        NewUser savedUser = userService.saveUser(newUser);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    // Get all users
    @GetMapping
    public List<NewUser> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get a user by ID
    @GetMapping("/{id}")
    public ResponseEntity<NewUser> getUserById(@PathVariable("id") String userId) {
        Optional<NewUser> newUser = userService.getUserById(userId);
        return newUser.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete a user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }
}
