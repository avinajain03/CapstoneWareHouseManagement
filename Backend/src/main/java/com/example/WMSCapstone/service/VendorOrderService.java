package com.example.WMSCapstone.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.WMSCapstone.model.Inventory;
import com.example.WMSCapstone.model.VendorOrder;
import com.example.WMSCapstone.repository.InventoryRepository;
import com.example.WMSCapstone.repository.VendorOrderRepository;

@Service
public class VendorOrderService {
	
	@Autowired
    private VendorOrderRepository vendorOrderRepo;
	
	@Autowired
	InventoryRepository inventoryRepo;
	
	public ResponseEntity<VendorOrder> addToCart(Inventory product){
		VendorOrder order = new VendorOrder();
	    order.setProductId(product.getProductId());
	    order.setProductName(product.getProductName());
	    order.setSupplierName(product.getSupplierName());
	    order.setPrice(product.getPrice());
	    order.setCategory(product.getCategory());
	    order.setProductQuantity(1);
	    VendorOrder savedOrder = vendorOrderRepo.save(order);
	    
	 // Update inventory
	    Inventory updatedProduct = inventoryRepo.findByProductId(product.getProductId()); // Get the product from inventory
	    updatedProduct.setQuantity(updatedProduct.getQuantity() - 1); // Reduce the quantity by 1
	    inventoryRepo.save(updatedProduct); // Save the updated product to inventory
	    
	    return new ResponseEntity<>(savedOrder, HttpStatus.OK);
	}

    public ResponseEntity<String> deleteByVendorOrderId(String vendorOrderId) {
        vendorOrderRepo.deleteByVendorOrderId(vendorOrderId);
        return new ResponseEntity<>("Order with ID " + vendorOrderId + " deleted successfully.", HttpStatus.OK);
    }
	
    public String updateVendorOrder(String vendorOrderId, VendorOrder updatedOrder) {
    	try {
    		
        VendorOrder order = vendorOrderRepo.findByVendorOrderId(vendorOrderId);
        if (order == null) {
        	return "Order with ID " + vendorOrderId + " not found."+ HttpStatus.NOT_FOUND;
        }

        order.setProductQuantity(updatedOrder.getProductQuantity());
        vendorOrderRepo.save(order);
        
        return "Order customm with ID " + vendorOrderId + " updated successfully"+ HttpStatus.OK;
    	} catch(Exception exc) {
    		return "Unsuccessful" + exc + HttpStatus.INTERNAL_SERVER_ERROR;
    	}
    }
    
    public ResponseEntity<List<VendorOrder>> getAllOrders() {
    	List<VendorOrder> orders = vendorOrderRepo.findAll();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    public ResponseEntity<String> updateInventory(String productId, int quantity) {
        Inventory product = inventoryRepo.findByProductId(productId);
        if (product == null) {
            return new ResponseEntity<>("Product with ID " + productId + " not found.", HttpStatus.NOT_FOUND);
        }
        
        System.out.println(product);
        product.setQuantity(product.getQuantity() + quantity);
        System.out.println(product);
        inventoryRepo.save(product);
        return new ResponseEntity<>("Inventory for product with ID " + productId + " updated successfully.", HttpStatus.OK);    
    }
	

}
