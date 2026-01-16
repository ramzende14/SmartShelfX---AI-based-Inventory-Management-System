package com.ai.inventoryapplication.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "purchase_orders")
public class PurchaseOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // DB internal ID

    @Column(name = "po_number", unique = true, nullable = false)
    private String poNumber; // BUSINESS TRANSACTION ID (PO-XXXX)

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "vendor_id", nullable = false)
    private InventoryUser vendor;

    @Column(nullable = false)
    private int quantity;

    /* 🔥 NEW: PURCHASE RATE PER UNIT */
    @Column(name = "purchase_rate", nullable = false)
    private double rate;

    /* 🔥 OPTIONAL: STORE TOTAL AMOUNT */
    @Column(name = "total_amount", nullable = false)
    private double totalAmount;

    @Enumerated(EnumType.STRING)
    private PurchaseOrderStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    /* ---------- AUTO CALCULATION ---------- */
    @PrePersist
    @PreUpdate
    public void calculateTotal() {
        this.totalAmount = this.rate * this.quantity;
    }

    /* ---------- GETTERS ---------- */
    public Long getId() { return id; }
    public String getPoNumber() { return poNumber; }
    public Product getProduct() { return product; }
    public InventoryUser getVendor() { return vendor; }
    public int getQuantity() { return quantity; }
    public double getRate() { return rate; }
    public double getTotalAmount() { return totalAmount; }
    public PurchaseOrderStatus getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    /* ---------- SETTERS ---------- */
    public void setId(Long id) { this.id = id; }
    public void setPoNumber(String poNumber) { this.poNumber = poNumber; }
    public void setProduct(Product product) { this.product = product; }
    public void setVendor(InventoryUser vendor) { this.vendor = vendor; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public void setRate(double rate) { this.rate = rate; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }
    public void setStatus(PurchaseOrderStatus status) { this.status = status; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
