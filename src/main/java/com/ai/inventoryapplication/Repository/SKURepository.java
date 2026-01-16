package com.ai.inventoryapplication.Repository;


import com.ai.inventoryapplication.Entity.SKU;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SKURepository extends JpaRepository<SKU, String> {
}

