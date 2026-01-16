package com.ai.inventoryapplication.Service;



import java.util.List;

import com.ai.inventoryapplication.Entity.SKU;
import com.ai.inventoryapplication.Repository.SKURepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class SKUService {

    @Autowired
    private SKURepository repo;

    public void saveSKU(SKU s) {
        repo.save(s);
    }

    public List<SKU> getAll() {
        return repo.findAll();
    }

    public SKU getById(String id) {
        return repo.findById(id).orElse(null);
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
}

