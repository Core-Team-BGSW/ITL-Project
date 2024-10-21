package com.api.Employee.Controller;


import com.api.Employee.Model.User;
import com.api.Employee.Model.UserDetails;
import com.api.Employee.Service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("userinfo/{userId}")
    public User getUserDetails(@PathVariable String userId) {
        return userService.getUserInfo(userId);
    }
    @GetMapping("departmentHead/{userId}")
    public String getDHDetails(@PathVariable String userId) {
        return userService.getDeptHead(userId);
    }

}


