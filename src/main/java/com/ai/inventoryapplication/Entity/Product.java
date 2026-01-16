package com.ai.inventoryapplication.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    private String id;   // P10001

    private String name;

    @Column(unique = true)
    private String sku;

    // 🔥🔥 FIX IS HERE
    @Column(name = "vendor_id", nullable = false)
    private Long vendorId;

    private int reorderLevel;
    private int currentStock;
    private String category;

    private Double currentPrice;
    private Double salePrice;

    public Product() {}

    // ---------- GETTERS ----------
    public String getId() { return id; }
    public String getName() { return name; }
    public String getSku() { return sku; }
    public Long getVendorId() { return vendorId; }
    public int getReorderLevel() { return reorderLevel; }
    public int getCurrentStock() { return currentStock; }
    public String getCategory() { return category; }
    public Double getCurrentPrice() { return currentPrice; }
    public Double getSalePrice() { return salePrice; }

    // ---------- SETTERS ----------
    public void setId(String id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setSku(String sku) { this.sku = sku; }
    public void setVendorId(Long vendorId) { this.vendorId = vendorId; }
    public void setReorderLevel(int reorderLevel) { this.reorderLevel = reorderLevel; }
    public void setCurrentStock(int currentStock) { this.currentStock = currentStock; }
    public void setCategory(String category) { this.category = category; }
    public void setCurrentPrice(Double currentPrice) { this.currentPrice = currentPrice; }
    public void setSalePrice(Double salePrice) { this.salePrice = salePrice; }
}
