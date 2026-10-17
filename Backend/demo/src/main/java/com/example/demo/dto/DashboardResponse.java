package com.example.demo.dto;

import java.util.List;

public record DashboardResponse(
        long total, long applied, long shortlisted, long interviews, long selected, long rejected,
        List<ApplicationResponse> recent, List<ApplicationResponse> upcomingInterviews) {
}
