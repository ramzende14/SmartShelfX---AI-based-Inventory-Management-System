package com.ai.inventoryapplication.DTO;


public class VendorResponse {

    private Long id;
    private String name;

    public VendorResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}

