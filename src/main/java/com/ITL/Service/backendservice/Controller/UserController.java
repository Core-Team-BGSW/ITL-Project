package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.User;
import com.ITL.Service.backendservice.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/addUser")
    @ResponseStatus(HttpStatus.CREATED)
    public User addUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/get/users")
    @ResponseStatus(HttpStatus.OK)
    public List<User> getUserList()
    {
        return userService.getUsers();
    }

    @GetMapping("/get/user/{id}")
    @ResponseStatus(HttpStatus.OK)
    public User getUser(@PathVariable String id) {
        return userService.getUser(id);
    }

    @DeleteMapping("/delete/user/{id}")
    @ResponseStatus(HttpStatus.OK)
    public String deleteUser(@PathVariable String id)
    {
        return userService.deleteUser(id);
    }

    @GetMapping("/get/user/location/{locCode}")
    @ResponseStatus(HttpStatus.OK)
    public List<User> getUsersByLocation(@PathVariable String locCode)
    {
        return userService.userByLocation(locCode);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public User updateUser(@PathVariable String id, @RequestBody User user)
    {
        return userService.updateUser(id,user);
    }
}

