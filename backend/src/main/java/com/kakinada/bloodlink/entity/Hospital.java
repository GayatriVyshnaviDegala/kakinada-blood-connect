package com.kakinada.bloodlink.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity @Table(name = "hospitals")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Hospital {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank @Column(unique = true) private String name;
    @NotBlank private String type;     // Government / Private / Trust
    @NotBlank private String address;  // Kakinada
    @NotBlank private String phone;

    @Column(name = "stock_a_pos")  private int stockAPos;
    @Column(name = "stock_a_neg")  private int stockANeg;
    @Column(name = "stock_b_pos")  private int stockBPos;
    @Column(name = "stock_b_neg")  private int stockBNeg;
    @Column(name = "stock_ab_pos") private int stockABPos;
    @Column(name = "stock_ab_neg") private int stockABNeg;
    @Column(name = "stock_o_pos")  private int stockOPos;
    @Column(name = "stock_o_neg")  private int stockONeg;
}
