# API smoke tests

Backend must be running at `http://localhost:8080`.

## List menu
```bash
curl http://localhost:8080/api/products
```

## Create menu item
```bash
curl -X POST http://localhost:8080/api/products -H "Content-Type: application/json" -d "{"name":"Paneer Wrap","description":"Spicy paneer wrap","price":149,"category":"Wraps","imageUrl":"","available":true}"
```

## Place order
Use an actual `productId` from the menu response:
```bash
curl -X POST http://localhost:8080/api/orders -H "Content-Type: application/json" -d "{"customerName":"Demo Student","phone":"9876543210","items":[{"productId":1,"quantity":2}]}"
```

## Health
```bash
curl http://localhost:8080/actuator/health
```
