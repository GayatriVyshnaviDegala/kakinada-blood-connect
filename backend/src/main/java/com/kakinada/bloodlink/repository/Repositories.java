package com.kakinada.bloodlink.repository;

import com.kakinada.bloodlink.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

public class Repositories {

    @Repository
    public interface DonorRepository extends JpaRepository<Donor, Long> {
        Optional<Donor> findByEmail(String email);
        List<Donor> findByBloodGroup(String bloodGroup);
        List<Donor> findByArea(String area);
        List<Donor> findByBloodGroupAndArea(String bloodGroup, String area);
        List<Donor> findByAvailableTrue();

        @Query("SELECT d.bloodGroup, COUNT(d) FROM Donor d GROUP BY d.bloodGroup")
        List<Object[]> countByBloodGroup();
    }

    @Repository
    public interface RecipientRepository extends JpaRepository<Recipient, Long> {
        Optional<Recipient> findByEmail(String email);
    }

    @Repository
    public interface HospitalRepository extends JpaRepository<Hospital, Long> {
        Optional<Hospital> findByName(String name);
    }

    @Repository
    public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {
        List<BloodRequest> findByStatus(BloodRequest.Status status);
        List<BloodRequest> findByBloodGroup(String bloodGroup);
    }

    @Repository
    public interface AdminRepository extends JpaRepository<Admin, Long> {
        Optional<Admin> findByEmail(String email);
    }
}
