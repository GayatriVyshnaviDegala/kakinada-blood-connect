package com.kakinada.bloodlink.service;

import com.kakinada.bloodlink.entity.Donor;
import com.kakinada.bloodlink.repository.Repositories.DonorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DonorService {
    private final DonorRepository repo;
    private final PasswordEncoder encoder;

    public Donor register(Donor d) {
        if (repo.findByEmail(d.getEmail()).isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
        d.setPassword(encoder.encode(d.getPassword()));
        return repo.save(d);
    }

    public Donor login(String email, String rawPassword) {
        Donor d = repo.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
        if (!encoder.matches(rawPassword, d.getPassword()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        return d;
    }

    public List<Donor> all() { return repo.findAll(); }

    public Donor byId(Long id) {
        return repo.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public List<Donor> search(String bg, String area, boolean availableOnly) {
        List<Donor> list;
        if (bg != null && !bg.isBlank() && area != null && !area.isBlank())
            list = repo.findByBloodGroupAndArea(bg, area);
        else if (bg != null && !bg.isBlank()) list = repo.findByBloodGroup(bg);
        else if (area != null && !area.isBlank()) list = repo.findByArea(area);
        else list = repo.findAll();
        if (availableOnly) list.removeIf(d -> !d.isAvailable());
        return list;
    }

    public Donor update(Long id, Donor patch) {
        Donor d = byId(id);
        d.setName(Optional.ofNullable(patch.getName()).orElse(d.getName()));
        d.setPhone(Optional.ofNullable(patch.getPhone()).orElse(d.getPhone()));
        d.setArea(Optional.ofNullable(patch.getArea()).orElse(d.getArea()));
        d.setAddress(Optional.ofNullable(patch.getAddress()).orElse(d.getAddress()));
        d.setAvailable(patch.isAvailable());
        d.setDonations(patch.getDonations());
        if (patch.getLastDonation() != null) d.setLastDonation(patch.getLastDonation());
        return repo.save(d);
    }

    public Donor toggleAvailability(Long id, boolean available) {
        Donor d = byId(id);
        d.setAvailable(available);
        return repo.save(d);
    }

    public void delete(Long id) { repo.deleteById(id); }
}
