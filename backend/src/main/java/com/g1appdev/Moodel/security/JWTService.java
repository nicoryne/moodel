package com.g1appdev.Moodel.security;

import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {

    private String generatedKey;

    public JWTService() {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey secretKey = keyGen.generateKey();
            this.generatedKey = Base64.getEncoder().encodeToString(secretKey.getEncoded());  
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("🔴 ERROR: Failed to generate key token.");
        }
    }

    public String generateToken(String username) {

        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() * 60 * 60 * 30))
                .and()
                .signWith(getKey()) 
                .compact();
    }

    private Key getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(generatedKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    
}
