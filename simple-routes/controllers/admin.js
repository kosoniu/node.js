const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  req.user.createProduct({
    title,
    description,
    imageUrl,
    price,
    userId: req.user.id
  })
  .then( result => {
    console.log('Created table')
    res.redirect('/admin/products');
  })
  .catch( error => {
    console.log(error);
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode){
    res.redirect('/');
  }

  const productId = req.params.productId;

  req.user.getProducts({where: { id: productId}})
  // Product.findById(productId)
  .then(products => {
    const product = products[0];
    if (!product){
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      pageTitle: 'Edit  Product',
      path: '/admin/edit-product',
      editing: editMode,
      product
    });
  })
  .catch(error => {
    console.log(error);
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImgUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  
  Product.findById(productId)
  .then( product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDescription;
    product.imageUrl = updatedImgUrl;
    return product.save();
  })
  .then( result => {
    console.log("Updated product")
    res.redirect('/admin/products');
  })
  .catch( error => console.log(error));
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  // Product.findAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch( error => {
    console.log(error);
  });
};


exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
  .then( product => {
    return product.destroy();
  })
  .then( result => {
    console.log("destroyed product")
    res.redirect('/admin/products');
  })
  .catch( error => console.log(error));
};
