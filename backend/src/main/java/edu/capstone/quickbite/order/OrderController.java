package edu.capstone.quickbite.order;

import edu.capstone.quickbite.product.Product;
import edu.capstone.quickbite.product.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderRepository orders;
    private final ProductRepository products;
    public OrderController(OrderRepository orders, ProductRepository products){this.orders=orders;this.products=products;}

    @GetMapping public List<CustomerOrder> all(){return orders.findAll();}
    @GetMapping("/{id}") public CustomerOrder one(@PathVariable Long id) {
        return orders.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));
    }
    @PostMapping @ResponseStatus(HttpStatus.CREATED)
    public CustomerOrder create(@Valid @RequestBody OrderRequest request) {
        CustomerOrder order = new CustomerOrder();
        order.setCustomerName(request.customerName()); order.setPhone(request.phone());
        BigDecimal total = BigDecimal.ZERO;
        for (OrderRequest.Item requested : request.items()) {
            Product product = products.findById(requested.productId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown product: " + requested.productId()));
            if (!product.isAvailable()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, product.getName()+" is unavailable");
            OrderItem item = new OrderItem();
            item.setProductId(product.getId()); item.setProductName(product.getName());
            item.setQuantity(requested.quantity()); item.setUnitPrice(product.getPrice()); item.setOrder(order);
            order.getItems().add(item);
            total = total.add(product.getPrice().multiply(BigDecimal.valueOf(requested.quantity())));
        }
        order.setTotal(total);
        return orders.save(order);
    }
}
