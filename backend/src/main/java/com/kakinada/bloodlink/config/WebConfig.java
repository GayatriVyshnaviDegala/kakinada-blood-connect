package com.kakinada.bloodlink.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry r) {
        r.addMapping("/**")
         .allowedOriginPatterns("http://localhost:*", "https://*.lovable.app", "https://*.lovableproject.com")
         .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
         .allowedHeaders("*");
    }
}
