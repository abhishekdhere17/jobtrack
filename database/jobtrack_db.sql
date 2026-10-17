-- JobTrack database for MySQL / phpMyAdmin
-- Import via phpMyAdmin: Import tab -> choose this file -> Go
-- (Optional: Spring Boot with ddl-auto=update will also create these tables for you.)

CREATE DATABASE IF NOT EXISTS jobtrack_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE jobtrack_db;

CREATE TABLE IF NOT EXISTS users (
  id          BIGINT       NOT NULL AUTO_INCREMENT,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) NOT NULL,
  password    VARCHAR(255) NOT NULL,           -- BCrypt hash
  headline    VARCHAR(150) DEFAULT 'Job Seeker',
  created_at  DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  UNIQUE KEY uk_users_email (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS job_applications (
  id              BIGINT        NOT NULL AUTO_INCREMENT,
  user_id         BIGINT        NOT NULL,
  company         VARCHAR(150)  NOT NULL,
  job_role        VARCHAR(150)  NOT NULL,
  location        VARCHAR(150)  DEFAULT NULL,
  salary          DECIMAL(12,2) DEFAULT NULL,
  applied_date    DATE          NOT NULL,
  status          VARCHAR(20)   NOT NULL DEFAULT 'Applied',
  interview_date  DATETIME(6)   DEFAULT NULL,
  notes           TEXT          DEFAULT NULL,
  created_at      DATETIME(6)   NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at      DATETIME(6)   NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  KEY idx_app_user (user_id),
  KEY idx_app_user_status (user_id, status),
  CONSTRAINT fk_app_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT chk_app_status CHECK (status IN ('Applied','Shortlisted','Interview','Selected','Rejected'))
) ENGINE=InnoDB;
