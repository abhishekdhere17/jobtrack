package com.example.demo.dto;

import com.example.demo.entity.JobApplication;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record ApplicationResponse(
        Long id, String company, String role, String location, BigDecimal salary,
        LocalDate date, String status, LocalDateTime interviewDate, String notes) {

    public static ApplicationResponse from(JobApplication a) {
        return new ApplicationResponse(a.getId(), a.getCompany(), a.getRole(), a.getLocation(),
                a.getSalary(), a.getAppliedDate(), a.getStatus(), a.getInterviewDate(), a.getNotes());
    }
}
