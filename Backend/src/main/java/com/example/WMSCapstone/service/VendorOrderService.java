package com.example.WMSCapstone.service;

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

    public void deleteByVendorOrderId(String vendorOrderId) {
        vendorOrderRepo.deleteByVendorOrderId(vendorOrderId);
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
