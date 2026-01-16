package com.ai.inventoryapplication.DTO;



import java.util.UUID;

public class TransactionCodeGenerator {

    public static String generateIO() {
        return "IO-" + UUID.randomUUID()
                .toString()
                .replace("-", "")
                .substring(0, 7)
                .toUpperCase();
    }
}
