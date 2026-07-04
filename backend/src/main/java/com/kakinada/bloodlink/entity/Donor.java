package com.kakinada.bloodlink.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity @Table(name = "donors")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Donor {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank private String name;
    @Email @NotBlank @Column(unique = true) private String email;
    @JsonIgnore @NotBlank private String password;
    @NotBlank private String phone;

    @Enumerated(EnumType.STRING) @NotNull
    private Gender gender;

    @Min(18) @Max(65) private int age;

    @Column(name = "blood_group") @NotBlank private String bloodGroup;
    @NotBlank private String area;   // Kakinada locality
    private String address;

    private int donations = 0;
    private boolean available = true;

    @Column(name = "last_donation") private LocalDate lastDonation;
    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    public enum Gender { Male, Female, Other }
}
