package com.example.WMSCapstone.modelDTO;

public class SignUpRequestDTO {
	
	private String userName;
    private String email;
    private String password;
    private String contact;
    private String role;
    
    
	public SignUpRequestDTO(String userName, String email, String password, String contact, String role) {
		super();
		this.userName = userName;
		this.email = email;
		this.password = password;
		this.contact = contact;
		this.role = role;
	}
	public SignUpRequestDTO() {
		// TODO Auto-generated constructor stub
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}

}
