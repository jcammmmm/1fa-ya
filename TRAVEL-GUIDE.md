# Capitain's Starlog
- Think when you migrate the code. If you believe that after all   
  you will end up with some specific change, do it. React didn't   
  reflect clearly where your error is, so after I imported every  
  thing in the same way it works.

- Spring Boot Security throws InternalAuthenticationServiceException  
  if you have repeated users.

- As style guide and convention, name your columns with lower case  
  in Postgres!

- If you get stuck with 'hibernate-sequence' error, create one in   
  database and you will get ready.

- For react routing use 'react-router-dom' and not 'react-router'.   
  The first one is for the web and the another is a common package  
  between native and web.  
  And import your Router as BrowserRouter.  
  import { BrowserRouter as Router, Route } from 'react-router-dom';  

- Keep care with nested npm projects. Parent dependencies might confuse  
  your dependencies in inner projects. Avoid this.  

- If you add or remove a Repository for an entity (specifically for a  
  many-to-many relationship) the fetch made for Hibernate varies.   
  For this project if you remove the Tag repository the returned results  
  for http://localhost:8080/services/1 are recursive for the tag   
  entity returning also the services for each tag, making a verbose  
  result.  
  In the other hand if you add a repository with save() and findBy(id)  
  methods the returned results for 'http://localhost:8080/services/1'  
  are not recursive and less 'verbose' giving us an eficient default   
  behavior.  
  Note that this does not relate with FetchType.LAZY  
  Even removing save() and findBy() methods the returned results  
  remain the same.  

- Since the javascript frontend and the data will be served from   
  diferent hosts we must configure properly CORS. To do that we added  
  a @CrossOrigin("http://localhost:8081") annotation to ServiceRepository.  
