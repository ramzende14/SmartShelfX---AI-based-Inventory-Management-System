package com.ai.inventoryapplication.Entity;



import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class SKU {

    @Id
    private String skuId;
    private String skuDescription;

    public SKU() {}

    public SKU(String skuId, String skuDescription) {
        this.skuId = skuId;
        this.skuDescription = skuDescription;
    }

    public String getSkuId() { return skuId; }
    public void setSkuId(String skuId) { this.skuId = skuId; }

    public String getSkuDescription() { return skuDescription; }
    public void setSkuDescription(String skuDescription) { this.skuDescription = skuDescription; }
}
