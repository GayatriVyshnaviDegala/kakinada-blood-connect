package com.kakinada.bloodlink.controller;

import com.kakinada.bloodlink.entity.BloodRequest;
import com.kakinada.bloodlink.service.BloodRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/requests")
@RequiredArgsConstructor
public class BloodRequestController {
    private final BloodRequestService svc;

    @PostMapping public BloodRequest create(@Valid @RequestBody BloodRequest r) { return svc.create(r); }
    @GetMapping public List<BloodRequest> all(@RequestParam(defaultValue="false") boolean openOnly) {
        return openOnly ? svc.open() : svc.all();
    }
    @GetMapping("/{id}") public BloodRequest byId(@PathVariable Long id) { return svc.byId(id); }
    @PutMapping("/{id}/status")
    public BloodRequest status(@PathVariable Long id, @RequestParam BloodRequest.Status status) {
        return svc.updateStatus(id, status);
    }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { svc.delete(id); }
}
