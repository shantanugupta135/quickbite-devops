package edu.capstone.quickbite.order;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
public class OrderItem {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    private Long productId;
    private String productName;
    private Integer quantity;
    private BigDecimal unitPrice;
    @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="order_id")
    @JsonIgnore private CustomerOrder order;

    public OrderItem() {}
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public Long getProductId(){return productId;} public void setProductId(Long id){productId=id;}
    public String getProductName(){return productName;} public void setProductName(String n){productName=n;}
    public Integer getQuantity(){return quantity;} public void setQuantity(Integer q){quantity=q;}
    public BigDecimal getUnitPrice(){return unitPrice;} public void setUnitPrice(BigDecimal p){unitPrice=p;}
    public CustomerOrder getOrder(){return order;} public void setOrder(CustomerOrder o){order=o;}
}
