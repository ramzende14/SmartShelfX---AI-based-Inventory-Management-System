package com.ai.inventoryapplication.Repository;


import com.ai.inventoryapplication.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ProductRepository extends JpaRepository<Product, String> {

    @Query(value = "SELECT id FROM products ORDER BY id DESC LIMIT 1", nativeQuery = true)
    String getLastProductId();

    Product findBySku(String sku);
    List<Product> findByVendorId(Long vendorId);

}

