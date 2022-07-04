# E Commerce Product Tracker
Hosted site = https://onkargavali.github.io/e-commerce-product-tracker/#/

Flow Diagram 

![image](https://user-images.githubusercontent.com/62386527/177102339-36a86e32-359a-4aed-a4ae-7e80aa2318cd.png)

## 1. Abstract
i. The Prices of E-Commerce Products are pretty Much Volatile and Sometimes we Regret to Buy a Product at Higher Price.<br/>
ii. Also, there are many ecommerce websites which provides same product but the price may be different on the websites<br/>
iii. There should be a price tracking system to keep track of prices on ecommerce websites<br/>
iv. This tracking can be done with the help of web scrapping<br/>
v. Also, we can compare the price of product on different websites with the help of web scrapping<br/>

## 2 Problem statement
a. To Create a Website Which will help the Customer by notifying Changes in Prices Of Product <br/>
b. Sending user a email when product price drops <br/>
c. Providing a interface through which user can analyse product prices <br/>
through graphs and can also add a product for tracking <br/>

## 3 Objectives
a. To Create A Web Page Where User Can Register a Product To Track.<br/>
b. Using Web Scraping Technology For Tracking Of a Particular Product <br/>
c. Allowing users to analyze price of the product with help of graphs and charts from the website <br/>
d. Users will receive an email every time price gets low <br/>
e. To save Customers valuable Time and Money <br/>

## 4 Methodology
### Methodology
a. Here we will use agile methodology for the development purpose <br/>
b. User can input URL or search the product <br/>
c. Using Web scraping and API calls we will get data about products <br/>
d. Search history is stored in database for future suggestions <br/>
e. We will also scrape other information from website such as special deals etc <br/>

### Price Checking Algorithm
a. Price history for last 7 days is stored in the database <br/>
b. According to it graphs will be generated which will allow customers to check lowest price for the product in last 7 days <br/>
c. At any time if price gets low than the current price customers will receive an email containing link, price and name of the product <br/>
d. Customer has to only provide product URL for once and he is all set to track his favorite product <br/>

### Working of Scrapper
a. We have deployed our scrapper on Heroku platform <br/>
b. It will check and update price of every product in database in every 25 mins <br/>
c. It is completely automated as it is fetching data directly from firebase <br/>
d. Selenium will safely access the ecommerce websites from chrome browser drivers and scrap the details about the product <br/>
e. Ecommerce websites cannot block the requests from selenium as those were generated from chrome drivers <br/>
