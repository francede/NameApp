##API Reference
---
###Fetch names

Returns list of all names in the database. By default returns names ordered by index.

* **URL**

    `/api/names`
    
* **Method**

    `GET`

*  **URL Params**

    **Optional:**
    
    * `order_by=[string]` <br/>
        value=amount|name
   
* **Success Response:**

  * **Code:** 200 <br/>
    **Content:** `{ "names" : [{"name":"Ville", "amount":"10"}] }`
    
###Fetch name

Returns one name from the database.

* **URL**

    `/api/name/:name`
    
* **Method**

    `GET`

*  **URL Params**
    
    **Required:**
    
    * `:name=[string]` <br/>
    Case insensitive name
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"name":"Ville", "amount":"10"}`
    
* **Error Response:**

  * **Code:** 404 <br/>
    **Content:** `{"msg":"Name not found"}`
    
###Fetch sum of names

Returns sum of all names in the database

* **URL**

    `/api/sum`
    
* **Method**

    `GET`

   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "sum" : 211 }`
