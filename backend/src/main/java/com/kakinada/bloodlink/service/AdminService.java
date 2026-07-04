package com.kakinada.bloodlink.service;

import com.kakinada.bloodlink.entity.Admin;
import com.kakinada.bloodlink.repository.Repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepository adminRepo;
    private final DonorRepository donorRepo;
    private final BloodRequestRepository requestRepo;
    private final PasswordEncoder encoder;

    public Admin login(String email, String pw) {
        Admin a = adminRepo.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        if (!encoder.matches(pw, a.getPassword()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        return a;
    }

    public Map<String, Object> stats() {
        Map<String, Object> s = new LinkedHashMap<>();
        long total = donorRepo.count();
        long available = donorRepo.findByAvailableTrue().size();
        s.put("totalDonors", total);
        s.put("availableDonors", available);
        s.put("totalRequests", requestRepo.count());
        s.put("openRequests", requestRepo.findByStatus(
            com.kakinada.bloodlink.entity.BloodRequest.Status.OPEN).size());

        Map<String, Long> dist = new LinkedHashMap<>();
        for (Object[] row : donorRepo.countByBloodGroup())
            dist.put((String) row[0], (Long) row[1]);
        s.put("bloodGroupDistribution", dist);
        return s;
    }
}
