package edu.capstone.quickbite;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertTrue;

class QuickBiteApplicationTests {
    @Test void applicationModuleSanityCheck() {
        assertTrue(QuickBiteApplication.class.getName().contains("QuickBite"));
    }
}
