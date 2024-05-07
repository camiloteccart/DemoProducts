package com.camilo.backend.cartapp.backendcartapp;

import com.camilo.backend.cartapp.backendcartapp.models.entities.Product;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class example {
    public static void main(String[] args) {
     long sum = myMethod ();
        System.out.println("sum = " + sum);
    }
    public static long myMethod(){
        List<Integer> list = new ArrayList<>();
        long lsum = 0;
        //list.add(2);
        for (int i=0; i < list.size(); i++) {
            lsum = lsum + list.get(i);
        }

        //lsum = list.stream().mapToInt(l  ()).sum()

        List<Product> customerList = new ArrayList<Product>();
        Set<Product> customerSet = new HashSet<>(customerList);

        return (lsum);


    }




}
