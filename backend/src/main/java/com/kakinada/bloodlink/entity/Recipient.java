package com.kakinada.bloodlink.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name = "recipients")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Recipient {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank private String name;
    @Email @NotBlank @Column(unique = true) private String email;
    @JsonIgnore @NotBlank private String password;
    @NotBlank private String phone;
    @Column(name = "blood_group") @NotBlank private String bloodGroup;
    @NotBlank private String area;
    private String hospital;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
