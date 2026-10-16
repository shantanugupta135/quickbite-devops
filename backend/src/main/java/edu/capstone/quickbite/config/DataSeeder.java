package edu.capstone.quickbite.config;

import edu.capstone.quickbite.product.Product;
import edu.capstone.quickbite.product.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.math.BigDecimal;

@Configuration
public class DataSeeder {
    @Bean CommandLineRunner seedProducts(ProductRepository products) {
        return args -> {
            if (products.count() == 0) {
                products.save(new Product("Classic Veg Burger","Crispy patty, lettuce and house sauce",new BigDecimal("129.00"),"Burgers","",true));
                products.save(new Product("Margherita Pizza","Mozzarella, basil and tomato",new BigDecimal("249.00"),"Pizza","",true));
                products.save(new Product("Paneer Tikka Wrap","Smoky paneer with mint chutney",new BigDecimal("169.00"),"Wraps","",true));
                products.save(new Product("Masala Fries","Golden fries with Indian spices",new BigDecimal("99.00"),"Sides","",true));
                products.save(new Product("Cold Coffee","Chilled coffee with creamy foam",new BigDecimal("119.00"),"Drinks","",true));
                products.save(new Product("Chocolate Brownie","Warm chocolate brownie",new BigDecimal("89.00"),"Desserts","",true));
            }
        };
    }
}
