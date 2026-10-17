package com.example.demo.service;

import com.example.demo.dto.ApplicationRequest;
import com.example.demo.dto.ApplicationResponse;
import com.example.demo.dto.DashboardResponse;
import com.example.demo.entity.JobApplication;
import com.example.demo.entity.User;
import com.example.demo.repository.JobApplicationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class ApplicationService {

    private final JobApplicationRepository repo;
    private final AuthService authService;

    public ApplicationService(JobApplicationRepository repo, AuthService authService) {
        this.repo = repo;
        this.authService = authService;
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponse> list(String email) {
        User u = authService.currentUser(email);
        return repo.findByUserIdOrderByAppliedDateDescIdDesc(u.getId())
                .stream().map(ApplicationResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public ApplicationResponse get(String email, Long id) {
        return ApplicationResponse.from(find(email, id));
    }

    public ApplicationResponse create(String email, ApplicationRequest req) {
        JobApplication a = new JobApplication();
        a.setUser(authService.currentUser(email));
        apply(a, req);
        return ApplicationResponse.from(repo.save(a));
    }

    public ApplicationResponse update(String email, Long id, ApplicationRequest req) {
        JobApplication a = find(email, id);
        apply(a, req);
        return ApplicationResponse.from(repo.save(a));
    }

    public void delete(String email, Long id) {
        repo.delete(find(email, id));
    }

    /** Interviews happening within the next 48 hours (used for reminders). */
    @Transactional(readOnly = true)
    public List<ApplicationResponse> reminders(String email) {
        Long uid = authService.currentUser(email).getId();
        LocalDateTime now = LocalDateTime.now();
        return repo.findByUserIdAndInterviewDateBetweenOrderByInterviewDateAsc(uid, now, now.plusHours(48))
                .stream().map(ApplicationResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public DashboardResponse dashboard(String email) {
        Long uid = authService.currentUser(email).getId();
        return new DashboardResponse(
                repo.countByUserId(uid),
                repo.countByUserIdAndStatus(uid, "Applied"),
                repo.countByUserIdAndStatus(uid, "Shortlisted"),
                repo.countByUserIdAndStatus(uid, "Interview"),
                repo.countByUserIdAndStatus(uid, "Selected"),
                repo.countByUserIdAndStatus(uid, "Rejected"),
                repo.findTop5ByUserIdOrderByAppliedDateDescIdDesc(uid)
                        .stream().map(ApplicationResponse::from).toList(),
                repo.findTop5ByUserIdAndInterviewDateAfterOrderByInterviewDateAsc(uid, LocalDateTime.now())
                        .stream().map(ApplicationResponse::from).toList());
    }

    // Only returns applications that belong to the logged-in user
    private JobApplication find(String email, Long id) {
        Long uid = authService.currentUser(email).getId();
        return repo.findByIdAndUserId(id, uid)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Application not found"));
    }

    private void apply(JobApplication a, ApplicationRequest r) {
        a.setCompany(r.company().trim());
        a.setRole(r.role().trim());
        a.setLocation(r.location());
        a.setSalary(r.salary());
        a.setAppliedDate(r.date());
        a.setStatus(r.status());
        a.setInterviewDate(r.interviewDate());
        a.setNotes(r.notes());
    }
}
