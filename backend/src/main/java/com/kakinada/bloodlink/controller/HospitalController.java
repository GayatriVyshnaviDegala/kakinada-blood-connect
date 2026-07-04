package com.kakinada.bloodlink.controller;

import com.kakinada.bloodlink.dto.AuthDtos.StockUpdate;
import com.kakinada.bloodlink.entity.Hospital;
import com.kakinada.bloodlink.service.HospitalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/hospitals")
@RequiredArgsConstructor
public class HospitalController {
    private final HospitalService svc;

    @GetMapping public List<Hospital> all() { return svc.all(); }
    @GetMapping("/{id}") public Hospital byId(@PathVariable Long id) { return svc.byId(id); }
    @PostMapping public Hospital create(@Valid @RequestBody Hospital h) { return svc.create(h); }
    @PutMapping("/{id}") public Hospital update(@PathVariable Long id, @RequestBody Hospital h) { return svc.update(id, h); }
    @PutMapping("/{id}/stock")
    public Hospital stock(@PathVariable Long id, @RequestBody StockUpdate u) {
        return svc.updateStock(id, u.bloodGroup(), u.units());
    }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { svc.delete(id); }
}
