import { API } from "../../backend"

// Category
const createcategory = (userid, token, category) => {
    return fetch (`${API}/category/create/${userid}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
         Authorization: `Bearer ${token}`
       },
    body: JSON.stringify(category)
    
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
export default createcategory;

// get all categories
export const getcategories = () => {
    return fetch(`${API}/categories`,{
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

// Product Call

// Add a Product
 export const createproduct = (userid, token, product) => {
    return fetch (`${API}/product/create/${userid}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
         Authorization: `Bearer ${token}`
       },
    body: product
    
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

// get all products
export const getproducts = () => {
    return fetch(`${API}/products`,{
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

// delete a product
export const deleteproduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
           Authorization: `Bearer ${token}`
         }
      
      })
      .then(response => {
          console.log(response)
        return response.json();
    })
    .catch(err => console.log(err));
}
  


// get a product
export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

// update a product

export const updateproduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
           Authorization: `Bearer ${token}`
         },
      body: product
      
      })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
  };
  


  // delete a category
export const deletecategory = (categoryId,userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
           Authorization: `Bearer ${token}`
         }
      
      })
      .then(response => {
          console.log(response)
        return response.json();
    })
    .catch(err => console.log(err));
}
  


// get a category
export const getcategory = categoryId => {
    return fetch(`${API}/category/${categoryId}`, {
      method: "GET"
    })
      .then(response => {
          console.log(response)
        return response.json();
      })
      .catch(err => console.log(err));
  };

// update a category

export const updatecategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
         },
      body: JSON.stringify(category)
      
      })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
  };
  