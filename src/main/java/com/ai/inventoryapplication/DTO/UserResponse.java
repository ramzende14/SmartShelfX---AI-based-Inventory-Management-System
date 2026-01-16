package com.ai.inventoryapplication.DTO;


public class UserResponse {

    private Long id;
    private String username;
    private String personalName;
    private String email;
    private String role;

    public UserResponse(Long id, String username, String personalName, String email, String role) {
        this.id = id;
        this.username = username;
        this.personalName = personalName;
        this.email = email;
        this.role = role;
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getPersonalName() { return personalName; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
}

