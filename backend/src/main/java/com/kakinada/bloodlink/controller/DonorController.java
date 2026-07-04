package com.kakinada.bloodlink.controller;

import com.kakinada.bloodlink.dto.AuthDtos.*;
import com.kakinada.bloodlink.entity.Donor;
import com.kakinada.bloodlink.service.DonorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/donors")
@RequiredArgsConstructor
public class DonorController {
    private final DonorService svc;

    @PostMapping("/register")
    public Donor register(@Valid @RequestBody Donor d) { return svc.register(d); }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest req) {
        Donor d = svc.login(req.email(), req.password());
        return new LoginResponse(d.getId(), d.getName(), d.getEmail(), "DONOR");
    }

    @GetMapping public List<Donor> all() { return svc.all(); }
    @GetMapping("/{id}") public Donor byId(@PathVariable Long id) { return svc.byId(id); }

    @GetMapping("/search")
    public List<Donor> search(@RequestParam(required=false) String bloodGroup,
                              @RequestParam(required=false) String area,
                              @RequestParam(defaultValue="false") boolean availableOnly) {
        return svc.search(bloodGroup, area, availableOnly);
    }

    @PutMapping("/{id}") public Donor update(@PathVariable Long id, @RequestBody Donor d) { return svc.update(id, d); }

    @PutMapping("/{id}/availability")
    public Donor availability(@PathVariable Long id, @RequestParam boolean available) {
        return svc.toggleAvailability(id, available);
    }

    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { svc.delete(id); }
}
