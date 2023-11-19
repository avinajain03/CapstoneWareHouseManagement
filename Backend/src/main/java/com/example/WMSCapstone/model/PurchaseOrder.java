package com.example.WMSCapstone.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "purchaseOrder")
public class PurchaseOrder {
	
	@Id
	private String purchaseOrderId;
	
	@DBRef
	private User userSupplier;
	private String productName;
	private Date vendorOrderDate;
	
	public String getPurchaseOrderId() {
		return purchaseOrderId;
	}
	public void setPurchaseOrderId(String purchaseOrderId) {
		this.purchaseOrderId = purchaseOrderId;
	}
	public User getUser() {
		return userSupplier;
	}
	public void setUser(User userSupplier) {
		this.userSupplier = userSupplier;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Date getVendorOrderDate() {
		return vendorOrderDate;
	}
	public void setVendorOrderDate(Date vendorOrderDate) {
		this.vendorOrderDate = vendorOrderDate;
	}

}
