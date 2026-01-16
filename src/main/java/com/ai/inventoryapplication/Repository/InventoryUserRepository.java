package com.ai.inventoryapplication.Repository;

import com.ai.inventoryapplication.Entity.InventoryUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InventoryUserRepository extends JpaRepository<InventoryUser, Long> {

    Optional<InventoryUser> findByUsername(String username);
}
