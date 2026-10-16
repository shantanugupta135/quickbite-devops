package edu.capstone.quickbite.order;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="customer_orders")
public class CustomerOrder {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    private String customerName;
    private String phone;
    private BigDecimal total;
    private String status = "PLACED";
    private Instant createdAt = Instant.now();
    @OneToMany(mappedBy="order", cascade=CascadeType.ALL, orphanRemoval=true, fetch=FetchType.EAGER)
    private List<OrderItem> items = new ArrayList<>();

    public CustomerOrder() {}
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getCustomerName(){return customerName;} public void setCustomerName(String n){customerName=n;}
    public String getPhone(){return phone;} public void setPhone(String p){phone=p;}
    public BigDecimal getTotal(){return total;} public void setTotal(BigDecimal t){total=t;}
    public String getStatus(){return status;} public void setStatus(String s){status=s;}
    public Instant getCreatedAt(){return createdAt;} public void setCreatedAt(Instant d){createdAt=d;}
    public List<OrderItem> getItems(){return items;} public void setItems(List<OrderItem> i){items=i;}
}
