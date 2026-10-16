package edu.capstone.quickbite.product;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Entity
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank @Size(max = 100)
    private String name;
    @Size(max = 500)
    private String description;
    @NotNull @DecimalMin("0.01")
    @Column(precision = 10, scale = 2)
    private BigDecimal price;
    @NotBlank
    private String category;
    private String imageUrl = "";
    private boolean available = true;

    public Product() {}
    public Product(String name, String description, BigDecimal price, String category, String imageUrl, boolean available) {
        this.name=name; this.description=description; this.price=price; this.category=category; this.imageUrl=imageUrl; this.available=available;
    }
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getName(){return name;} public void setName(String name){this.name=name;}
    public String getDescription(){return description;} public void setDescription(String description){this.description=description;}
    public BigDecimal getPrice(){return price;} public void setPrice(BigDecimal price){this.price=price;}
    public String getCategory(){return category;} public void setCategory(String category){this.category=category;}
    public String getImageUrl(){return imageUrl;} public void setImageUrl(String imageUrl){this.imageUrl=imageUrl;}
    public boolean isAvailable(){return available;} public void setAvailable(boolean available){this.available=available;}
}
