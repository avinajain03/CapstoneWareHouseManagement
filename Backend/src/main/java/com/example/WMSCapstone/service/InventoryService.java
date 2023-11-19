package com.example.WMSCapstone.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.WMSCapstone.model.Inventory;
import com.example.WMSCapstone.modelDTO.InventoryDTO;
import com.example.WMSCapstone.repository.InventoryRepository;


@Service
public class InventoryService {
	
	@Autowired 
	InventoryRepository inventoryRepo;
	
	public String saveInventory(Inventory inventory) {
		inventoryRepo.save(inventory);
		return "Product Added Successfully";
	}
	
	public List<Inventory> getAllProducts(){
        return inventoryRepo.findAll();	
    }
	
	public String saveAllProducts(List<Inventory> inventories) {
        inventoryRepo.saveAll(inventories);
        return "Products Added";
    }
	
	public List<InventoryDTO> getAllInventory() {
        List<Inventory> inventoryList = inventoryRepo.findAll();
        List<InventoryDTO> inventoryDTOList = new ArrayList<>();
        for (Inventory inventory : inventoryList) {
            InventoryDTO inventoryDTO = new InventoryDTO();
            inventoryDTO.setProductId(inventory.getProductId());
            inventoryDTO.setProductName(inventory.getProductName());
            inventoryDTO.setPrice(inventory.getPrice());
            inventoryDTO.setCategory(inventory.getCategory());
            inventoryDTO.setSupplierName(inventory.getSupplierName());
            inventoryDTOList.add(inventoryDTO);
        }
        return inventoryDTOList;
    }
	
	
	

}
