package com.ai.inventoryapplication.Repository;

import com.ai.inventoryapplication.Entity.ProductSales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProductSalesRepository extends JpaRepository<ProductSales, String> {

    @Query(value = """
        SELECT 
            p.id AS product_id,
            p.name AS product_name,
            SUM(st.transaction_value) AS total_sale_value,
            SUM(st.quantity) AS total_quantity
        FROM stock_transactions st
        JOIN products p ON p.id = st.product_id
        WHERE st.type = 'OUT'
        GROUP BY p.id, p.name
    """, nativeQuery = true)
    List<ProductSales> getProductWiseSales();
}
