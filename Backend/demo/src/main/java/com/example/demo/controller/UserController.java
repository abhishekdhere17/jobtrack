package com.example.demo.controller;

import com.example.demo.dto.UpdateProfileRequest;
import com.example.demo.dto.UserResponse;
import com.example.demo.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final AuthService auth;

    public UserController(AuthService auth) {
        this.auth = auth;
    }

    @GetMapping("/me")
    public UserResponse me(Authentication authentication) {
        return UserResponse.from(auth.currentUser(authentication.getName()));
    }

    @PutMapping("/me")
    public UserResponse update(Authentication authentication, @Valid @RequestBody UpdateProfileRequest req) {
        return auth.updateProfile(authentication.getName(), req);
    }
}
