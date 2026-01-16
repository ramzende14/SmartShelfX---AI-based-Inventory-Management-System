package com.ai.inventoryapplication.Service;

import com.ai.inventoryapplication.DTO.PONumberGenerator;
import com.ai.inventoryapplication.Entity.*;
import com.ai.inventoryapplication.Repository.ProductRepository;
import com.ai.inventoryapplication.Repository.PurchaseOrderRepository;
import com.ai.inventoryapplication.Repository.StockTransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class PurchaseOrderService {

    @Autowired
    private PurchaseOrderRepository poRepo;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private StockTransactionRepository transactionRepo;

    /* ================= CREATE PO ================= */
    public PurchaseOrder createPO(Product product,
                                  InventoryUser vendor,
                                  int quantity) {

        if (quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than zero");
        }

        PurchaseOrder po = new PurchaseOrder();
        po.setPoNumber(PONumberGenerator.generate());
        po.setProduct(product);
        po.setVendor(vendor);
        po.setQuantity(quantity);
        po.setRate(product.getCurrentPrice());   // 🔥 snapshot of buying price
        po.setStatus(PurchaseOrderStatus.PENDING);
        po.setCreatedAt(LocalDateTime.now());

        return poRepo.save(po);
    }

    /* ================= GET ================= */
    public List<PurchaseOrder> getVendorPOs(Long vendorId) {
        return poRepo.findByVendorId(vendorId);
    }

    public List<PurchaseOrder> getAllPOs() {
        return poRepo.findAll();
    }

    public PurchaseOrder getPO(Long poId) {
        return poRepo.findById(poId)
                .orElseThrow(() -> new RuntimeException("Purchase Order not found"));
    }

    /* ================= APPROVE ================= */
    public PurchaseOrder approvePO(Long poId) {
        PurchaseOrder po = getPO(poId);

        if (po.getStatus() != PurchaseOrderStatus.PENDING) {
            throw new RuntimeException("Only PENDING PO can be approved");
        }

        po.setStatus(PurchaseOrderStatus.APPROVED);
        po.setUpdatedAt(LocalDateTime.now());
        return poRepo.save(po);
    }

    /* ================= DISPATCH ================= */
    public PurchaseOrder dispatchPO(Long poId) {
        PurchaseOrder po = getPO(poId);

        if (po.getStatus() != PurchaseOrderStatus.APPROVED) {
            throw new RuntimeException("Only APPROVED PO can be dispatched");
        }

        po.setStatus(PurchaseOrderStatus.DISPATCHED);
        po.setUpdatedAt(LocalDateTime.now());
        return poRepo.save(po);
    }

    /* ================= COMPLETE ================= */
    public PurchaseOrder completePO(Long poId) {

        PurchaseOrder po = getPO(poId);

        if (po.getStatus() != PurchaseOrderStatus.DISPATCHED) {
            throw new RuntimeException("PO must be DISPATCHED before completion");
        }

        Product product = po.getProduct();

        // 1️⃣ Update stock
        product.setCurrentStock(product.getCurrentStock() + po.getQuantity());
        productRepo.save(product);

        // 2️⃣ Create Stock IN Transaction (linked to PO number)
        StockTransaction tx = new StockTransaction();
        tx.setTransactionRef(po.getPoNumber());     // 🔥 PO number
        tx.setProductId(product.getId());
        tx.setQuantity(po.getQuantity());
        tx.setType(TransactionType.IN);
        tx.setRate(po.getRate());
        tx.setTransactionValue(po.getTotalAmount());
        tx.setHandledBy(po.getVendor().getId());
        tx.setTimestamp(LocalDateTime.now());

        transactionRepo.save(tx);

        // 3️⃣ Complete PO
        po.setStatus(PurchaseOrderStatus.COMPLETED);
        po.setUpdatedAt(LocalDateTime.now());

        return poRepo.save(po);
    }

    /* ================= DELETE ================= */
    public void deletePO(Long poId) {
        poRepo.deleteById(poId);
    }
}
