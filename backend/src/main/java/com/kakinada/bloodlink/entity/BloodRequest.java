package com.kakinada.bloodlink.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name = "blood_requests")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class BloodRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "patient_name") @NotBlank private String patientName;
    @Column(name = "blood_group")  @NotBlank private String bloodGroup;
    @Min(1) private int units;
    @NotBlank private String hospital;
    @NotBlank private String area;

    @Enumerated(EnumType.STRING) @NotNull
    private Urgency urgency;

    @NotBlank private String contact;
    @Size(max = 500) private String note;

    @Enumerated(EnumType.STRING)
    private Status status = Status.OPEN;

    @Column(name = "posted_at", insertable = false, updatable = false)
    private LocalDateTime postedAt;

    public enum Urgency { Critical, High, Moderate }
    public enum Status  { OPEN, FULFILLED, CLOSED }
}
