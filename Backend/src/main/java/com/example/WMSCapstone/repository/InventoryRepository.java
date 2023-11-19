package com.example.WMSCapstone.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.WMSCapstone.model.Inventory;

@Repository
public interface InventoryRepository extends MongoRepository<Inventory, String>{
	
	Inventory findByProductId(String productId);
	List<Inventory> findBySupplierName(String supplierName);
	

}
