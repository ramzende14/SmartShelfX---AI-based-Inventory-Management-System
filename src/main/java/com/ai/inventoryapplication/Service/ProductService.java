package com.ai.inventoryapplication.Service;

import java.util.List;

import com.ai.inventoryapplication.Entity.Product;
import com.ai.inventoryapplication.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repo;

    private String generateProductId() {
        String lastId = repo.getLastProductId();

        if (lastId == null) {
            return "P10001";
        }

        int num = Integer.parseInt(lastId.substring(1));
        num++;

        return "P" + num;
    }

    public String generateNextProductId() {
        return generateProductId();
    }

    public Product saveProduct(Product product) {

        if (product.getId() == null || product.getId().isEmpty()) {
            product.setId(generateProductId());
        }

        return repo.save(product);
    }

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    /* 🔥 VENDOR PRODUCTS ONLY */
    public List<Product> getProductsByVendor(Long vendorId) {
        return repo.findByVendorId(vendorId);
    }

    public Product getProductById(String id) {
        return repo.findById(id).orElse(null);
    }

    public Product getProductBySku(String sku) {
        return repo.findBySku(sku);
    }

    public void deleteProduct(String id) {
        repo.deleteById(id);
    }

    public Product updateProduct(Product product) {
        return repo.save(product);
    }
}
