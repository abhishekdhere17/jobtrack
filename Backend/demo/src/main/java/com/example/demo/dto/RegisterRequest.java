package com.example.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "Name is required") @Size(max = 100) String name,
        @NotBlank(message = "Email is required") @Email(message = "Invalid email address") String email,
        @NotBlank(message = "Password is required")
        @Size(min = 6, max = 72, message = "Password must be 6-72 characters") String password) {
}
