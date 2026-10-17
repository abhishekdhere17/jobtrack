package com.example.demo.repository;

import com.example.demo.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByUserIdOrderByAppliedDateDescIdDesc(Long userId);

    Optional<JobApplication> findByIdAndUserId(Long id, Long userId);

    long countByUserId(Long userId);

    long countByUserIdAndStatus(Long userId, String status);

    List<JobApplication> findTop5ByUserIdOrderByAppliedDateDescIdDesc(Long userId);

    List<JobApplication> findByUserIdAndInterviewDateBetweenOrderByInterviewDateAsc(Long userId, LocalDateTime from, LocalDateTime to);

    List<JobApplication> findTop5ByUserIdAndInterviewDateAfterOrderByInterviewDateAsc(Long userId, LocalDateTime after);
}
