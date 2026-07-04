package com.kakinada.bloodlink.service;

import com.kakinada.bloodlink.entity.BloodRequest;
import com.kakinada.bloodlink.repository.Repositories.BloodRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BloodRequestService {
    private final BloodRequestRepository repo;

    public BloodRequest create(BloodRequest r) { return repo.save(r); }
    public List<BloodRequest> all() { return repo.findAll(); }
    public List<BloodRequest> open() { return repo.findByStatus(BloodRequest.Status.OPEN); }
    public BloodRequest byId(Long id) { return repo.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)); }
    public BloodRequest updateStatus(Long id, BloodRequest.Status s) {
        BloodRequest r = byId(id); r.setStatus(s); return repo.save(r);
    }
    public void delete(Long id) { repo.deleteById(id); }
}
