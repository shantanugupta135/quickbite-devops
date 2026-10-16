package edu.capstone.quickbite.product;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductRepository repository;
    public ProductController(ProductRepository repository){this.repository=repository;}

    @GetMapping public List<Product> all(@RequestParam(defaultValue="false") boolean availableOnly) {
        return availableOnly ? repository.findByAvailableTrueOrderByCategoryAscNameAsc() : repository.findAll();
    }
    @GetMapping("/{id}") public Product one(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    }
    @PostMapping @ResponseStatus(HttpStatus.CREATED) public Product create(@Valid @RequestBody Product product) {
        product.setId(null); return repository.save(product);
    }
    @PutMapping("/{id}") public Product update(@PathVariable Long id, @Valid @RequestBody Product input) {
        Product product = repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        product.setName(input.getName()); product.setDescription(input.getDescription()); product.setPrice(input.getPrice());
        product.setCategory(input.getCategory()); product.setImageUrl(input.getImageUrl()); product.setAvailable(input.isAvailable());
        return repository.save(product);
    }
    @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id) {
        if (!repository.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
        repository.deleteById(id);
    }
}
