package com.ai.inventoryapplication.Controller;

import java.util.List;
import java.util.Map;

import com.ai.inventoryapplication.Entity.InventoryUser;
import com.ai.inventoryapplication.Entity.Product;
import com.ai.inventoryapplication.Service.InventoryUserService;
import com.ai.inventoryapplication.Service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/invent/products")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductService service;

    @Autowired
    private InventoryUserService userService;

    /* ---------- CREATE ---------- */
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return service.saveProduct(product);
    }

    /* ---------- ALL PRODUCTS (ADMIN / MANAGER) ---------- */
    @GetMapping
    public List<Product> getAllProducts() {
        return service.getAllProducts();
    }

    /* ---------- VENDOR PRODUCTS (🔥 FIX) ---------- */
    @GetMapping("/vendor")
    public List<Product> getVendorProducts(Authentication auth) {

        InventoryUser vendor =
                userService.getUserByUsername(auth.getName());

        Long vendorId = vendor.getId(); // 🔥 LOGGED-IN VENDOR

        return service.getProductsByVendor(vendorId);
    }

    /* ---------- BY ID ---------- */
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable String id) {
        return service.getProductById(id);
    }

    /* ---------- BY SKU ---------- */
    @GetMapping("/sku/{sku}")
    public Product getProductBySku(@PathVariable String sku) {
        return service.getProductBySku(sku);
    }

    /* ---------- NEXT ID ---------- */
    @GetMapping("/next-id")
    public Map<String, String> getNextProductId() {
        String nextId = service.generateNextProductId();
        return Map.of("productId", nextId);
    }

    /* ---------- UPDATE ---------- */
    @PutMapping
    public Product updateProduct(@RequestBody Product product) {
        return service.updateProduct(product);
    }

    /* ---------- DELETE ---------- */
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable String id) {
        service.deleteProduct(id);
    }

}
