package com.ai.inventoryapplication.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "product_sales_view")
public class ProductSales {

    @Id
    private String productId;

    private String productName;

    private Double totalSaleValue;

    private Long totalQuantity;

    public ProductSales() {
    }

    public ProductSales(String productId, String productName, Double totalSaleValue, Long totalQuantity) {
        this.productId = productId;
        this.productName = productName;
        this.totalSaleValue = totalSaleValue;
        this.totalQuantity = totalQuantity;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Double getTotalSaleValue() {
        return totalSaleValue;
    }

    public void setTotalSaleValue(Double totalSaleValue) {
        this.totalSaleValue = totalSaleValue;
    }

    public Long getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(Long totalQuantity) {
        this.totalQuantity = totalQuantity;
    }
}
