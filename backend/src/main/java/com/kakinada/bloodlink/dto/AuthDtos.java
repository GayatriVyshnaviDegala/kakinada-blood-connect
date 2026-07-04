package com.kakinada.bloodlink.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AuthDtos {
    public record LoginRequest(@Email @NotBlank String email, @NotBlank String password) {}
    public record LoginResponse(Long id, String name, String email, String role) {}
    public record StockUpdate(String bloodGroup, int units) {}
}
