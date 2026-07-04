-- Kakinada Blood Link — MySQL Schema
DROP DATABASE IF EXISTS kakinada_bloodlink;
CREATE DATABASE kakinada_bloodlink CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE kakinada_bloodlink;

CREATE TABLE donors (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(120) NOT NULL,
    email         VARCHAR(150) NOT NULL UNIQUE,
    password      VARCHAR(255) NOT NULL,
    phone         VARCHAR(20)  NOT NULL,
    gender        ENUM('Male','Female','Other') NOT NULL,
    age           INT NOT NULL,
    blood_group   VARCHAR(5)  NOT NULL,
    area          VARCHAR(80) NOT NULL,   -- Kakinada locality
    address       VARCHAR(255),
    donations     INT DEFAULT 0,
    available     BOOLEAN DEFAULT TRUE,
    last_donation DATE,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_donor_bg (blood_group),
    INDEX idx_donor_area (area)
) ENGINE=InnoDB;

CREATE TABLE recipients (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    name         VARCHAR(120) NOT NULL,
    email        VARCHAR(150) NOT NULL UNIQUE,
    password     VARCHAR(255) NOT NULL,
    phone        VARCHAR(20)  NOT NULL,
    blood_group  VARCHAR(5)   NOT NULL,
    area         VARCHAR(80)  NOT NULL,
    hospital     VARCHAR(150),
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE hospitals (
    id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(160) NOT NULL UNIQUE,
    type     VARCHAR(40)  NOT NULL,    -- Government / Private / Trust
    address  VARCHAR(255) NOT NULL,    -- Kakinada address
    phone    VARCHAR(20)  NOT NULL,
    stock_a_pos  INT DEFAULT 0,
    stock_a_neg  INT DEFAULT 0,
    stock_b_pos  INT DEFAULT 0,
    stock_b_neg  INT DEFAULT 0,
    stock_ab_pos INT DEFAULT 0,
    stock_ab_neg INT DEFAULT 0,
    stock_o_pos  INT DEFAULT 0,
    stock_o_neg  INT DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE blood_requests (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(120) NOT NULL,
    blood_group  VARCHAR(5)   NOT NULL,
    units        INT NOT NULL,
    hospital     VARCHAR(160) NOT NULL,
    area         VARCHAR(80)  NOT NULL,
    urgency      ENUM('Critical','High','Moderate') NOT NULL,
    contact      VARCHAR(20)  NOT NULL,
    note         VARCHAR(500),
    status       ENUM('OPEN','FULFILLED','CLOSED') DEFAULT 'OPEN',
    posted_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_req_bg (blood_group),
    INDEX idx_req_status (status)
) ENGINE=InnoDB;

CREATE TABLE admins (
    id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    email    VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name     VARCHAR(120) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE donations_log (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    donor_id   BIGINT NOT NULL,
    hospital   VARCHAR(160) NOT NULL,
    units      INT DEFAULT 1,
    donated_on DATE NOT NULL,
    FOREIGN KEY (donor_id) REFERENCES donors(id) ON DELETE CASCADE
) ENGINE=InnoDB;
