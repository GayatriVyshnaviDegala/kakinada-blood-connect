package com.kakinada.bloodlink.service;

import com.kakinada.bloodlink.entity.Recipient;
import com.kakinada.bloodlink.repository.Repositories.RecipientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipientService {
    private final RecipientRepository repo;
    private final PasswordEncoder encoder;

    public Recipient register(Recipient r) {
        if (repo.findByEmail(r.getEmail()).isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email exists");
        r.setPassword(encoder.encode(r.getPassword()));
        return repo.save(r);
    }

    public Recipient login(String email, String pw) {
        Recipient r = repo.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        if (!encoder.matches(pw, r.getPassword()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        return r;
    }

    public List<Recipient> all() { return repo.findAll(); }
    public Recipient byId(Long id) { return repo.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)); }
    public Recipient update(Long id, Recipient p) {
        Recipient r = byId(id);
        r.setName(p.getName()); r.setPhone(p.getPhone());
        r.setArea(p.getArea()); r.setHospital(p.getHospital());
        r.setBloodGroup(p.getBloodGroup());
        return repo.save(r);
    }
    public void delete(Long id) { repo.deleteById(id); }
}
