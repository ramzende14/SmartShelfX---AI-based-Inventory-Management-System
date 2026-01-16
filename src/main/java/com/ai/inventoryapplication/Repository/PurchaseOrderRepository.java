package com.ai.inventoryapplication.Repository;

import com.ai.inventoryapplication.Entity.PurchaseOrder;
import com.ai.inventoryapplication.Entity.PurchaseOrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PurchaseOrderRepository
        extends JpaRepository<PurchaseOrder, Long> {

    List<PurchaseOrder> findByVendorId(Long vendorId);
    List<PurchaseOrder> findByStatus(PurchaseOrderStatus status);
    Optional<PurchaseOrder>
    findTopByProductIdAndStatusOrderByUpdatedAtDesc(
            String productId,
            PurchaseOrderStatus status
    );

}
