package com.ai.inventoryapplication.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class InventoryUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // REAL USER ID

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String personalName;

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String role; // ADMIN / MANAGER / VENDOR

    public InventoryUser() {}

    /* ---------- GETTERS ---------- */
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public String getPersonalName() { return personalName; }
    public String getEmail() { return email; }
    public String getRole() { return role; }

    /* ---------- SETTERS ---------- */
    public void setId(Long id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setPassword(String password) { this.password = password; }
    public void setPersonalName(String personalName) { this.personalName = personalName; }
    public void setEmail(String email) { this.email = email; }
    public void setRole(String role) { this.role = role; }
}
