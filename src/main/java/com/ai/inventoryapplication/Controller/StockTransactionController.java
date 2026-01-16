package com.ai.inventoryapplication.Controller;

import com.ai.inventoryapplication.Entity.*;
import com.ai.inventoryapplication.Repository.*;
import com.ai.inventoryapplication.Service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invent")
@CrossOrigin(origins = "*")
public class StockTransactionController {

    @Autowired
    private PurchaseOrderService purchaseOrderService;

    @Autowired
    private StockTransactionService stockTransactionService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private InventoryUserRepository userRepository;

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    /* =====================================================
       PURCHASE ORDER APIs
       ===================================================== */

    // CREATE PURCHASE ORDER
    @PostMapping("/purchase-orders/create")
    public PurchaseOrder createPurchaseOrder(
            @RequestParam String productId,
            @RequestParam Long vendorId,
            @RequestParam int quantity) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        InventoryUser vendor = userRepository.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        return purchaseOrderService.createPO(product, vendor, quantity);
    }

    // ✅ GET ALL PURCHASE ORDERS
    @GetMapping("/purchase-orders/all")
    public List<PurchaseOrder> getAllPurchaseOrders() {
        return purchaseOrderService.getAllPOs();
    }

    // ✅ GET PURCHASE ORDERS FOR VENDOR (🔥 THIS WAS MISSING)
    @GetMapping("/purchase-orders/vendor/{vendorId}")
    public List<PurchaseOrder> getPurchaseOrdersForVendor(
            @PathVariable Long vendorId) {

        return purchaseOrderService.getVendorPOs(vendorId);
    }

    // GET PURCHASE ORDER BY ID
    @GetMapping("/purchase-orders/{id}")
    public PurchaseOrder getPurchaseOrderById(@PathVariable Long id) {
        return purchaseOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase Order not found"));
    }

    // APPROVE PO
    @PutMapping("/purchase-orders/{poId}/approve")
    public PurchaseOrder approvePurchaseOrder(@PathVariable Long poId) {
        return purchaseOrderService.approvePO(poId);
    }

    // DISPATCH PO
    @PutMapping("/purchase-orders/{poId}/dispatch")
    public PurchaseOrder dispatchPurchaseOrder(@PathVariable Long poId) {
        return purchaseOrderService.dispatchPO(poId);
    }

    // COMPLETE PO (AUTO STOCK IN)
    @PutMapping("/purchase-orders/{poId}/complete")
    public PurchaseOrder completePurchaseOrder(@PathVariable Long poId) {
        return purchaseOrderService.completePO(poId);
    }

    // DELETE PO
    @DeleteMapping("/purchase-orders/{id}")
    public void deletePurchaseOrder(@PathVariable Long id) {
        purchaseOrderRepository.deleteById(id);
    }

    /* =====================================================
       STOCK TRANSACTION APIs
       ===================================================== */

    // STOCK OUT
    @PostMapping("/stock/out")
    public StockTransaction stockOut(
            @RequestParam String productId,
            @RequestParam int quantity,
            @RequestParam Long userId) {

        return stockTransactionService.stockOut(productId, quantity, userId);
    }

    // STOCK TRANSACTION HISTORY
    @GetMapping("/stock/transactions")
    public List<StockTransaction> getStockTransactions() {
        return stockTransactionService.getAllTransactions();
    }
    @GetMapping("/analytics/product-sales")
    public List<ProductSales> getProductSales() {
        return stockTransactionService.getProductWiseSales();
    }

}
