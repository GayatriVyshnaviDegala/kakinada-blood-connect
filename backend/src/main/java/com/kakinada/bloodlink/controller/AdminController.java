package com.kakinada.bloodlink.controller;

import com.kakinada.bloodlink.dto.AuthDtos.*;
import com.kakinada.bloodlink.entity.Admin;
import com.kakinada.bloodlink.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService svc;

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest req) {
        Admin a = svc.login(req.email(), req.password());
        return new LoginResponse(a.getId(), a.getName(), a.getEmail(), "ADMIN");
    }

    @GetMapping("/stats")
    public Map<String, Object> stats() { return svc.stats(); }
}
