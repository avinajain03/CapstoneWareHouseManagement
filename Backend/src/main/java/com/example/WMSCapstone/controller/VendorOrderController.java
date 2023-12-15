package com.example.WMSCapstone.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


import org.springframework.web.bind.annotation.RestController;


import com.example.WMSCapstone.model.Inventory;
import com.example.WMSCapstone.model.VendorOrder;
import com.example.WMSCapstone.repository.InventoryRepository;
import com.example.WMSCapstone.repository.VendorOrderRepository;
import com.example.WMSCapstone.service.VendorOrderService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class VendorOrderController {
	
	@Autowired
	VendorOrderRepository vendorOrderRepo;
	
	@Autowired
	VendorOrderService vendorOrderService;
	
	@Autowired 
	InventoryRepository inventoryRepo;
	
    @PostMapping("/addToCart")
    public ResponseEntity<VendorOrder> addToCart(@RequestBody Inventory product) {
    	return vendorOrderService.addToCart(product);
    }
	
	@GetMapping("/getAllOrders")
    public ResponseEntity<List<VendorOrder>> getAllOrders() {
        return vendorOrderService.getAllOrders();
    }
	
	@DeleteMapping("delete/{vendorOrderId}")
    public ResponseEntity<String> deleteOrderById(@PathVariable String vendorOrderId) {
        return vendorOrderService.deleteByVendorOrderId(vendorOrderId);
    }
	
	@PutMapping("/updateVendorOrder/{vendorOrderId}")
	public String updateVendorOrder(@PathVariable String vendorOrderId, @RequestBody VendorOrder updatedOrder) {
	    return vendorOrderService.updateVendorOrder(vendorOrderId, updatedOrder);
	}
	
	@PutMapping("/updateInventory/{productId}/{quantity}")
	public ResponseEntity<String> updateInventory(@PathVariable String productId, @PathVariable int quantity) {
		return vendorOrderService.updateInventory(productId, quantity);
	}
	
}
