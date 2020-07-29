package com.jcflorezv.unfaya.houseServices.filters;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jcflorezv.unfaya.houseServices.models.User;
import com.jcflorezv.unfaya.houseServices.services.UserService;
import com.jcflorezv.unfaya.houseServices.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

  @Autowired
  JwtUtil jwtUtil;

  @Autowired
  UserService userService;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
      final String authorizationHeader = request.getHeader("Authorization");
      
      String username = null;
      String jwt = null;
      if (authorizationHeader != null && authorizationHeader.startsWith("Bearer")) {
        jwt = authorizationHeader.substring(7);
        username = jwtUtil.extractUsername(jwt);
      }

      if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        User user = userService.loadUserByUsername(username);
        if (jwtUtil.validateToken(jwt, user)) {
          UsernamePasswordAuthenticationToken authObject = new UsernamePasswordAuthenticationToken(user, null, null);
          authObject.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(authObject);
        }
      }

      filterChain.doFilter(request, response);

  }
}