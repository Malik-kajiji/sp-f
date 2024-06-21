import './styles/global.scss'
import { Alert, Cart, Footer, Header, ShowHeaderSetter } from './components'
import { BrowserRouter,Route , Routes, useLocation } from 'react-router-dom';
import { Home,Group,Login, MyAccount, PaymentPage, TermsAndCond, ResetPassword, RePlaceOrder } from './pages'
import { useState } from 'react';
import { useSelector } from 'react-redux'

function App() {
  const [showHeader,setShowHeader] = useState(true)
  const [showCart,setShowCart] = useState(true)

  return (
      <BrowserRouter >
      <main className='App'>
        <ShowHeaderSetter setShowHeader={setShowHeader} setShowCart={setShowCart}/>
        {showCart && <Cart />}
        {showHeader && <Header />}
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/group/:_id' element={<OldGroup />} /> */}
          <Route path='/group/:_id' element={<Group />} />
          <Route path='/login' element={<Login />} />
          <Route path='/my-account' element={<MyAccount />} />
          <Route path='/payment' element={<PaymentPage />} />
          <Route path='/terms' element={<TermsAndCond />} />
          <Route path='/reset/:_id' element={<ResetPassword />} />
          <Route path='/complete-payment/:_id' element={<RePlaceOrder />} />
        </Routes>
        <Alert />
        {showHeader && <Footer />}
      </main>
    </BrowserRouter>
  );
}

export default App;

// const redirectToTelegram = () => {
//   const botUsername = 'maliksFirstBot';
//   const message = 'YOUR_MESSAGE sfsfs sdfs sdfsfd';
//   const telegramUrl = `tg://resolve?domain=${botUsername}&text=${message}`;
//   window.location.href = telegramUrl;
// };
