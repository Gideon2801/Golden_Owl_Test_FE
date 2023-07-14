import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import nike from './asset/nike.png';
import trash from './asset/trash.png';
import minus from './asset/minus.png';
import plus from './asset/plus.png';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getProducts();
    getCart();
  }, []);

  const getProducts = async () => {
    try {
      const url = `https://test-code-api.onrender.com/product`;
      const { data } = await axios.get(url, { withCredentials: true });
      setProducts(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCart = () => {
    setCart(JSON.parse(localStorage.getItem('cart')));
    const totalPrice = JSON.parse(localStorage.getItem('cart')).reduce(
      (total, product) => {
        return total + product.price * product.count;
      },
      0
    );
    setTotalPrice(totalPrice.toFixed(2));
  };

  const addToCart = (product) => {
    // Kiểm tra xem giỏ hàng đã tồn tại trong LocalStorage chưa
    let cart = localStorage.getItem('cart');
    if (!cart) {
      // Nếu giỏ hàng chưa tồn tại, tạo một giỏ hàng mới và thêm sản phẩm vào
      cart = [{ ...product, count: 1 }];
    } else {
      // Nếu giỏ hàng đã tồn tại, chuyển đổi từ chuỗi JSON sang mảng và thêm sản phẩm vào
      cart = JSON.parse(cart);
      cart.push({ ...product, count: 1 });
    }
    console.log(product);
    // Lưu giỏ hàng vào LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    getCart();
  };

  const removeItemCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    getCart();
  };

  const increaseItem = (item) => {
    console.log(1);
    const updatedCart = cart.map((product) => {
      if (product._id === item._id) {
        const newQuantity = product.count + 1;
        return { ...product, count: newQuantity };
      }
      return product;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    getCart();
  };

  const decreaseItem = (item) => {
    if (item.count === 1) {
      removeItemCart(item._id);
    } else {
      const updatedCart = cart.map((product) => {
        if (product._id === item._id) {
          const newQuantity = product.count - 1;
          return { ...product, count: newQuantity };
        }
        return product;
      });
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      getCart();
    }
  };

  return (
    <div className="App_mainContent_12BYb">
      <div className="App_card_38zmH">
        <div className="App_cardTop_3hHIG">
          <img className="App_cardTopLogo_2ho9K" src={nike} />
        </div>
        <div className="App_cardTitle_29nyq">Our Products</div>
        <div className="App_cardBody_1tfYc">
          {products?.map((item) => {
            const check = cart.find((itemCart) => {
              return itemCart._id === item._id && itemCart.name === item.name;
            });
            const isInCart = Boolean(check);
            return (
              <div style={{ marginBottom: '60px' }}>
                <div
                  className="App_shopItemImage_341iU"
                  style={{ background: item?.color }}
                >
                  <img src={item?.image}></img>
                </div>
                <div className="App_shopItemName_1_FJR">{item?.name}</div>
                <div className="App_shopItemDescription_1EIVK">
                  {item?.description}
                </div>
                <div className="App_shopItemBottom_3401_">
                  <div className="App_shopItemPrice_2SLiG">${item?.price}</div>
                  {isInCart ? (
                    <div className="App_inactive_19f0W App_shopItemButton_23FO1">
                      <div className="App_shopItemButtonCover_1bH2R">
                        <div className="App_shopItemButtonCoverCheckIcon_18IzJ"></div>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="App_shopItemButton_23FO1"
                      style={{ border: 'none' }}
                      onClick={(e) => {
                        addToCart(item);
                      }}
                    >
                      <p>ADD TO CART</p>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CART */}
      <div className="App_card_38zmH">
        <div className="App_cardTop_3hHIG">
          <img className="App_cardTopLogo_2ho9K" src={nike} />
        </div>
        <div className="App_cardTitle_29nyq">
          Your cart
          <span className="App_cardTitleAmount_17QFR">$ {totalPrice}</span>
        </div>
        <div className="App_cardBody_1tfYc">
          {cart.length === 0 && <p>Your cart is empty.</p>}
          {cart?.map((item) => (
            <div>
              <div className="App_cartItem_lfA9I">
                <div className="App_cartItemLeft_1HqDk ">
                  <div
                    className="App_cartItemImage_1rLvq cartItemImage"
                    style={{ backgroundColor: '#e1e7ed' }}
                  >
                    <div className="App_cartItemImageBlock_wRE4E">
                      <img src={item.image} />
                    </div>
                  </div>
                </div>
                <div className="App_cartItemRight_2LNcC">
                  <div className="App_cartItemName_3he6M cartItemName">
                    {item.name}
                  </div>
                  <div className="App_cartItemPrice_R0sr2 cartItemPrice">
                    ${item.price}
                  </div>
                  <div className="App_cartItemActions_13kia cartItemActions">
                    <div className="App_cartItemCount_1GCCN cartItemCount">
                      <button
                        className="App_cartItemCountButton_Gr8VG"
                        style={{ border: 'none' }}
                        onClick={(e) => decreaseItem(item)}
                      >
                        <img src={minus} />
                      </button>
                      <div className="App_cartItemCountNumber_1Evq9">
                        {item.count}
                      </div>
                      <button
                        className="App_cartItemCountButton_Gr8VG"
                        style={{ border: 'none' }}
                        onClick={(e) => increaseItem(item)}
                      >
                        <img src={plus} />
                      </button>
                    </div>
                    <button
                      className="App_cartItemRemove_1GiLR cartItemRemove"
                      style={{ border: 'none' }}
                      onClick={(e) => removeItemCart(item._id)}
                    >
                      <img src={trash} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
