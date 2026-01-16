package com.ai.inventoryapplication.Service;

import com.ai.inventoryapplication.Entity.InventoryUser;
import com.ai.inventoryapplication.Repository.InventoryUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryUserService implements UserDetailsService {

    @Autowired
    private InventoryUserRepository repo;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        InventoryUser user = repo.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

        return User.withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole())
                .build();
    }

    public InventoryUser getUserByUsername(String username) {
        return repo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void saveUser(InventoryUser user) {
        repo.save(user);
    }

    /* ---------- FETCH ALL USERS ---------- */
    public List<InventoryUser> getAllUsers() {
        return repo.findAll();
    }
}
