package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Exception.LocationCodeException;
import com.ITL.Service.backendservice.Exception.UserNotFoundException;
import com.ITL.Service.backendservice.Model.User;
import com.ITL.Service.backendservice.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;

    public User saveUser(User user) {
        int randomInt = (int)(Math.random()*1);
        user.setUserId(UUID.randomUUID().toString().split("-")[randomInt]);
        return userRepo.save(user);
    }
    public List<User> getUsers() {
        List<User> userList;
        userList = userRepo.findAll();
        return userList;
    }

    public String deleteUser(String userId) {
        Optional<User> userOptional =  userRepo.findById(userId);
        if(userOptional.isPresent())
        {
            userRepo.deleteById(userId);
            return "User is Successfully Deleted from the database record.";
        }
        else {
            throw new UserNotFoundException("User not found with id: " + userId);
        }
    }

    public User getUser(String id) {
        return userRepo.findById(id).orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }

    public List<User> userByLocation(String locationCode) {
        List<User> user =  userRepo.findByLocationCode(locationCode);
        if(user.isEmpty())
        {
            throw new LocationCodeException("location code is not valid");
        }
        return user;
    }

    public User updateUser(String id, User user) {
        Optional<User> userOptional = userRepo.findById(id);
        if(userOptional.isPresent()) {
            user.setUserId(id);
            return userRepo.save(user);
        }
        throw new UserNotFoundException("User not found with id: " + id);
    }
}

