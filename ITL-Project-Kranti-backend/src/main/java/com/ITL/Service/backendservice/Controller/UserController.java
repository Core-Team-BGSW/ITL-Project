package com.ITL.Service.backendservice.Controller;

import com.ITL.Service.backendservice.Model.User;
import com.ITL.Service.backendservice.Service.UserService;
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
