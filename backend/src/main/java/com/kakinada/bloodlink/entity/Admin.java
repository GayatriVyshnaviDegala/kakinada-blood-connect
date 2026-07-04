package com.kakinada.bloodlink.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "admins")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Admin {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true) private String email;
    @JsonIgnore private String password;
    private String name;
}
