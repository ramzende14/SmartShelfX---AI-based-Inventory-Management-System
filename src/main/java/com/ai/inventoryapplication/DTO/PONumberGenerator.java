package com.ai.inventoryapplication.DTO;



import java.util.UUID;

public class PONumberGenerator {

    public static String generate() {
        String random = UUID.randomUUID()
                .toString()
                .replace("-", "")
                .substring(0, 9)
                .toUpperCase();

        return "PO-" + random;   // PO-1552896ABC
    }
}

