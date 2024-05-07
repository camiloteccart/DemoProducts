package com.camilo.backend.cartapp.backendcartapp.services;

import com.camilo.backend.cartapp.backendcartapp.models.entities.Product;

import java.util.List;

public interface ProductService {
    List<Product> findAll();
}
