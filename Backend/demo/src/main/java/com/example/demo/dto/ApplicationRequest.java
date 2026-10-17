package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/** Field names match the React form (company, role, location, salary, date, status, interviewDate, notes). */
public record ApplicationRequest(
        @NotBlank(message = "Company is required") @Size(max = 150) String company,
        @NotBlank(message = "Job role is required") @Size(max = 150) String role,
        @Size(max = 150) String location,
        @PositiveOrZero(message = "Salary cannot be negative") BigDecimal salary,
        @NotNull(message = "Applied date is required") LocalDate date,
        @NotBlank(message = "Status is required")
        @Pattern(regexp = "Applied|Shortlisted|Interview|Selected|Rejected",
                message = "Status must be Applied, Shortlisted, Interview, Selected or Rejected") String status,
        LocalDateTime interviewDate,
        @Size(max = 5000) String notes) {
}
