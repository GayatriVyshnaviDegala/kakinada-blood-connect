package com.kakinada.bloodlink.controller;

import com.kakinada.bloodlink.dto.AuthDtos.*;
import com.kakinada.bloodlink.entity.Recipient;
import com.kakinada.bloodlink.service.RecipientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/recipients")
@RequiredArgsConstructor
public class RecipientController {
    private final RecipientService svc;

    @PostMapping("/register") public Recipient register(@Valid @RequestBody Recipient r) { return svc.register(r); }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest req) {
        Recipient r = svc.login(req.email(), req.password());
        return new LoginResponse(r.getId(), r.getName(), r.getEmail(), "RECIPIENT");
    }

    @GetMapping public List<Recipient> all() { return svc.all(); }
    @GetMapping("/{id}") public Recipient byId(@PathVariable Long id) { return svc.byId(id); }
    @PutMapping("/{id}") public Recipient update(@PathVariable Long id, @RequestBody Recipient r) { return svc.update(id, r); }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { svc.delete(id); }
}
