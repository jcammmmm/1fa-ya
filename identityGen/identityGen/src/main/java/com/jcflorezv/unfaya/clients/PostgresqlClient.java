package com.jcflorezv.unfaya.clients;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import com.jcflorezv.unfaya.entities.Address;

public class PostgresqlClient {
  private String DB_USER;
  private String DB_PASS;
  private String DB_URL;
  
  public PostgresqlClient(String hostIP, String port, String databaseName, String username, String password) {
    DB_USER = username;
    DB_PASS = password;
    DB_URL = "jdbc:postgresql://" + hostIP + ":" + port + "/" + databaseName + "";
  }

  public void insert(Address addr, String sha, String firstPwd) throws SQLException {
    Connection c = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
    Statement stmt = c.createStatement();
    String sql = "INSERT INTO public.address (\"WAY\", \"MAIN\", \"LETTER\", \"SUB\", \"POSITION\", \"BIS\", \"SUR\", \"SHA\", \"FIRST_PWD\")" +
                       "VALUES('" + addr.way + "', " +
                                    addr.main + ", '" + 
                                    addr.letter + "', " +
                                    addr.intersect + ", " +
                                    addr.position + ", " +
                                    addr.bis + ", '" +
                                    addr.sur + "', '" + 
                                    sha + "', '" +
                                    firstPwd + "')";
    System.out.println(sql);
    stmt.executeUpdate(sql);
    stmt.close();
    // c.commit();
    c.close();
  }
}