const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch( error => {
      console.log(error);
    });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId)
  .then((product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: "Product Detail",
      path: '/products'
    });
  })
  .catch ( error => console.log(error) );
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: "Shop",
      path: '/'
    });
  })
  .catch( error => {
    console.log(error);
  });
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
  .then( cart => {
    return cart.getProducts();
  })
  .then( products => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products
    });
  })
  .catch( error => console.log(error));
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;

  req.user.getCart()
  .then( cart => {
    fetchedCart = cart;
    return cart.getProducts({ where: {id: productId } });
  })
  .then( products => {
    let product;
    if(products.length > 0){
      product = products[0];
    }

    if(product) {
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
      return product;
    }else{
      return Product.findById(productId);
    }
  })
  .then( product => {
    return fetchedCart.addProduct(product, { 
      through: { quantity: newQuantity } });
  })
  .then( () => {
    res.redirect('/cart');
  })
  .catch( error => console.log(error));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  req.user.getCart()
  .then( cart => {
    return cart.getProducts({ where: {id: productId } });
  })
  .then( products => {
    const product = products[0];
    return product.cartItem.destroy();
  })
  .then( result => {
    res.redirect('/cart');
  })
  .catch()



  Product.findById(productId, product => {
    Cart.deleteProduct(productId, product.price);
    res.redirect('/cart');
  });
  
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
