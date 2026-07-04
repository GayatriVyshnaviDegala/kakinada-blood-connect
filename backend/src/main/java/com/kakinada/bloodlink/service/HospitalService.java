package com.kakinada.bloodlink.service;

import com.kakinada.bloodlink.entity.Hospital;
import com.kakinada.bloodlink.repository.Repositories.HospitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HospitalService {
    private final HospitalRepository repo;

    public List<Hospital> all() { return repo.findAll(); }
    public Hospital byId(Long id) { return repo.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)); }
    public Hospital create(Hospital h) { return repo.save(h); }
    public Hospital update(Long id, Hospital p) {
        Hospital h = byId(id);
        h.setName(p.getName()); h.setType(p.getType());
        h.setAddress(p.getAddress()); h.setPhone(p.getPhone());
        h.setStockAPos(p.getStockAPos()); h.setStockANeg(p.getStockANeg());
        h.setStockBPos(p.getStockBPos()); h.setStockBNeg(p.getStockBNeg());
        h.setStockABPos(p.getStockABPos()); h.setStockABNeg(p.getStockABNeg());
        h.setStockOPos(p.getStockOPos()); h.setStockONeg(p.getStockONeg());
        return repo.save(h);
    }
    public Hospital updateStock(Long id, String bloodGroup, int units) {
        Hospital h = byId(id);
        switch (bloodGroup) {
            case "A+"  -> h.setStockAPos(units);
            case "A-"  -> h.setStockANeg(units);
            case "B+"  -> h.setStockBPos(units);
            case "B-"  -> h.setStockBNeg(units);
            case "AB+" -> h.setStockABPos(units);
            case "AB-" -> h.setStockABNeg(units);
            case "O+"  -> h.setStockOPos(units);
            case "O-"  -> h.setStockONeg(units);
            default    -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid blood group");
        }
        return repo.save(h);
    }
    public void delete(Long id) { repo.deleteById(id); }
}
