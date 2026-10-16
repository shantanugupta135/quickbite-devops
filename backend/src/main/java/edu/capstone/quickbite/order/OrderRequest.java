package edu.capstone.quickbite.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;

public record OrderRequest(@NotBlank @Size(max=100) String customerName,
                           @NotBlank @Pattern(regexp="[0-9+() -]{7,20}") String phone,
                           @NotEmpty List<@Valid Item> items) {
    public record Item(@NotNull Long productId, @NotNull @Min(1) @Max(50) Integer quantity) {}
}
