package com.ai.inventoryapplication.Controller;

import com.ai.inventoryapplication.DTO.LoginRequest;
import com.ai.inventoryapplication.DTO.LoginResponse;
import com.ai.inventoryapplication.DTO.UserResponse;
import com.ai.inventoryapplication.DTO.VendorResponse;
import com.ai.inventoryapplication.Entity.InventoryUser;
import com.ai.inventoryapplication.Service.InventoryUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/invent")
@CrossOrigin("*")
public class LoginController {

    @Autowired
    private InventoryUserService service;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /* ---------- REGISTER ---------- */
    @PostMapping("/register")
    public void register(@RequestBody InventoryUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        service.saveUser(user);
    }

    /* ---------- LOGIN ---------- */
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        InventoryUser user = service.getUserByUsername(request.getUsername());

        return new LoginResponse(
                user.getId(),
                user.getRole()
        );
    }

    /* ---------- USER REPORT ---------- */
    @GetMapping("/users")
    public List<UserResponse> getAllUsers() {

        return service.getAllUsers()
                .stream()
                .map(u -> new UserResponse(
                        u.getId(),
                        u.getUsername(),
                        (u.getPersonalName() != null && !u.getPersonalName().isEmpty())
                                ? u.getPersonalName()
                                : u.getUsername(),
                        u.getEmail(),
                        u.getRole()
                ))
                .collect(Collectors.toList());
    }

    /* ---------- VENDOR LIST (🔥 IMPORTANT) ---------- */
    @GetMapping("/vendors")
    public List<VendorResponse> getAllVendors() {

        return service.getAllUsers()
                .stream()
                .filter(u -> "VENDOR".equalsIgnoreCase(u.getRole()))
                .map(u -> new VendorResponse(
                        u.getId(),
                        (u.getPersonalName() != null && !u.getPersonalName().isEmpty())
                                ? u.getPersonalName()
                                : u.getUsername()
                ))
                .collect(Collectors.toList());
    }
}
