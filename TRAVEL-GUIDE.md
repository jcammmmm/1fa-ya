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