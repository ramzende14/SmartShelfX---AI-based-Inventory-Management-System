package com.ai.inventoryapplication.Repository;


import com.ai.inventoryapplication.Entity.StockTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockTransactionRepository extends JpaRepository<StockTransaction, Long> {

    List<StockTransaction> findByProductId(String productId);
}

