![](https://i.imgur.com/YcXf41f.png)
# The app

ExamShop is a simple shopping app that has all of the functionality that a shopping site needs.

## [](https://github.com/StiliyanKushev/examShopAngular#idea)Idea

At start, the user is provided only with a home view,that shows the last 2 products that are added to the shop, a shop view in witch you have the option to buy a product, but you will be redirected to the login page, and the login + register pages.

A logged-in user can sell or buy products. He can also edit and delete his own products. If the user goes into his inventory, he can see all products that he is selling, sold or bought.

Admins are just regular users, however they can edit and delete everyone's products if they feel like it.

## Basic file structure *(only the important parts)*

```
├── assets				  // all images and svg that are used	   
|
├── components			  // all components are here
|   ├── partials          // These are smaller reusable components	
|   |   ├── Inventory.vue <- This is partial because its template with subsections
|   |   └── Product.vue			
|   ├── views		      // These are the 'pages' or router views
|   |   ├── Edit.vue	
|   |   ├── Home.vue	
|   |   ├── Inventory.vue	
|   |   ├── Login.vue	
|   |   ├── Register.vue	
|   |   ├── Sell.vue	
|   |   └── Shop.vue	
|   ├── AppHeader.vue     // These are the main 'root' components
|   ├── AppContent.vue	  <- Here is where the route views are displayed 
|   └── AppFooter.vue
|
├── plugins		     
|   ├── cookies.js		  // Imports the vue-cookies
|   └── router.js		  // Imports and manages vue-router
```
## Security and Validation

The app validates everything that the user is doing, and the backend logic will  **NOT**  let anyone who is not friendly to do harmful things.

In case of an error, or if someone purposely tries to "cheat" or "break" the app, the frontend **AND** backend will both respond with a meaningful error message that the client/vue will receive and display with the help of  [vue-toastify]([https://www.npmjs.com/package/vue-toastify](https://www.npmjs.com/package/vue-toastify))  library (along with [vuelidate]([[https://vuelidate.js.org/#sub-basic-usage](https://vuelidate.js.org/#sub-basic-usage)]) in most cases).

## Routes

The app split in 2 parts

1.  **Public**  -  _Anyone can access it_.
2.  **Private**  -  _Only users can access it._

***Admins have full control over everything***

## [](https://github.com/StiliyanKushev/examShopAngular#services)Handlers/Mixins

1.  #### User Handler
    

-   Saves the user data in cookies on login/register and removes them on logout.

2.  #### Form Mixin
    

-   handles the submit and validation of any form that uses vuelidate. It Has a callback if successful.

3.  #### Cookies
    

-   Saves the user data such as 'username', 'token', 'roles'. This is the only "global" data.

4.  #### Toast Response ( +vuelidate)
    

-   handles the response body after a fetch and "toasts" the app with the provided by the frontend/backend message.