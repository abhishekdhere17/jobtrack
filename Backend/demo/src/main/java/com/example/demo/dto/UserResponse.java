package com.example.demo.dto;

import com.example.demo.entity.User;

public record UserResponse(Long id, String name, String email, String headline) {
    public static UserResponse from(User u) {
        return new UserResponse(u.getId(), u.getName(), u.getEmail(), u.getHeadline());
    }
}
