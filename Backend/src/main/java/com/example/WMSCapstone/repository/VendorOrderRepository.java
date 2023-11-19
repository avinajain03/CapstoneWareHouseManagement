package com.example.WMSCapstone.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.WMSCapstone.model.VendorOrder;

@Repository
public interface VendorOrderRepository extends MongoRepository<VendorOrder, String>{
	
    List<VendorOrder> findByProductId(Long productId);
    void deleteByVendorOrderId(String vendorOrderId);
    VendorOrder findByVendorOrderId(String vendorOrderId);
	

}
