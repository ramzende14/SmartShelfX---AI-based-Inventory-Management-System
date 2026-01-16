package com.ai.inventoryapplication.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "stock_transactions")
public class StockTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;   // internal DB id

    @Column(name = "transaction_ref", nullable = false)
    private String transactionRef;   // PO-XXXX

    private String productId;
    private int quantity;

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    private Long handledBy;
    private LocalDateTime timestamp;

    private Double rate;
    private Double transactionValue;

    public StockTransaction() {
        this.timestamp = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getTransactionRef() { return transactionRef; }
    public String getProductId() { return productId; }
    public int getQuantity() { return quantity; }
    public TransactionType getType() { return type; }
    public Long getHandledBy() { return handledBy; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public Double getRate() { return rate; }
    public Double getTransactionValue() { return transactionValue; }

    public void setId(Long id) { this.id = id; }
    public void setTransactionRef(String transactionRef) { this.transactionRef = transactionRef; }
    public void setProductId(String productId) { this.productId = productId; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public void setType(TransactionType type) { this.type = type; }
    public void setHandledBy(Long handledBy) { this.handledBy = handledBy; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public void setRate(Double rate) { this.rate = rate; }
    public void setTransactionValue(Double transactionValue) { this.transactionValue = transactionValue; }

    public void setTransactionCode(String s) {
    }
}
