package com.example.demo.controller;

import com.example.demo.dto.ApplicationRequest;
import com.example.demo.dto.ApplicationResponse;
import com.example.demo.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService service;

    public ApplicationController(ApplicationService service) {
        this.service = service;
    }

    @GetMapping
    public List<ApplicationResponse> list(Authentication a) {
        return service.list(a.getName());
    }

    @GetMapping("/reminders")
    public List<ApplicationResponse> reminders(Authentication a) {
        return service.reminders(a.getName());
    }

    @GetMapping("/{id}")
    public ApplicationResponse get(Authentication a, @PathVariable Long id) {
        return service.get(a.getName(), id);
    }

    @PostMapping
    public ResponseEntity<ApplicationResponse> create(Authentication a, @Valid @RequestBody ApplicationRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(a.getName(), req));
    }

    @PutMapping("/{id}")
    public ApplicationResponse update(Authentication a, @PathVariable Long id,
                                      @Valid @RequestBody ApplicationRequest req) {
        return service.update(a.getName(), id, req);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(Authentication a, @PathVariable Long id) {
        service.delete(a.getName(), id);
        return ResponseEntity.noContent().build();
    }
}
