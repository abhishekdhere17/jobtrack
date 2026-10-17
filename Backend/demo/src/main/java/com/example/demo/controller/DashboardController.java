package com.example.demo.controller;

import com.example.demo.dto.DashboardResponse;
import com.example.demo.service.ApplicationService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final ApplicationService service;

    public DashboardController(ApplicationService service) {
        this.service = service;
    }

    @GetMapping
    public DashboardResponse dashboard(Authentication a) {
        return service.dashboard(a.getName());
    }
}
