package com.ai.inventoryapplication.Controller;



import java.util.List;

import com.ai.inventoryapplication.Entity.SKU;
import com.ai.inventoryapplication.Service.SKUService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/invent/sku")
@CrossOrigin("*")
public class SKUController {

    @Autowired
    private SKUService service;

    @PostMapping
    public void save(@RequestBody SKU sku) {
        service.saveSKU(sku);
    }

    @GetMapping
    public List<SKU> all() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public SKU get(@PathVariable String id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }

    @PutMapping
    public void update(@RequestBody SKU sku) {
        service.saveSKU(sku);
    }
}
