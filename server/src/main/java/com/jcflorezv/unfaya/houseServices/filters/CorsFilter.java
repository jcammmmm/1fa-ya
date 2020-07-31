package com.jcflorezv.unfaya.houseServices.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// https://stackoverflow.com/questions/57053238/cors-policy-blocking-my-post-request-after-disabling-it-globally-in-my-spring-bo
// https://stackoverflow.com/questions/40286549/spring-boot-security-cors
// https://www.itsfullofstars.de/2018/11/response-for-preflight-does-not-have-http-ok-status/
public class CorsFilter implements Filter {

  @Override
  public void init(FilterConfig filterConfig) throws ServletException {

  }

  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
      HttpServletResponse response = (HttpServletResponse) servletResponse;
      HttpServletRequest request= (HttpServletRequest) servletRequest;

      response.setHeader("Access-Control-Allow-Origin", "*");
      response.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
      response.setHeader("Access-Control-Allow-Headers", "*");
      response.setHeader("Access-Control-Allow-Credentials", "true");
      response.setHeader("Access-Control-Max-Age", "180");
      response.setStatus(200);
      filterChain.doFilter(servletRequest, servletResponse);
  }

  @Override
  public void destroy() {

  }
}