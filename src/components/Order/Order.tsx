import { FC, FormEvent, ChangeEvent, useState, useEffect } from "react";

import { Preloader } from "../Preloader";
import { cartState, clearCart, postOrder, setSuccess } from "../../redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

export const Order: FC = () => {
  const { cart, loading, success, error } = useAppSelector(cartState);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [agreement, setAgreement] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!success) return;

    dispatch(clearCart());

    return () => {
      dispatch(setSuccess(false));
    }
  }, [success]);


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const order = {
      owner: { phone, address },
      items: cart,
    };

    dispatch(postOrder(order));
  };

  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleChangeAgreement = (e: ChangeEvent<HTMLInputElement>) => {
    setAgreement(e.target.checked);
  };

  return (
    <section className="order">
      {success && <h4 className="text-center text-success">Заказ успешно оформлен!</h4>}
      {!success && (
        <>
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
            <form
              onSubmit={handleSubmit}
              className="card-body"
            >
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={handleChangePhone}
                  placeholder="Ваш телефон"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input
                  id="address"
                  value={address}
                  onChange={handleChangeAddress}
                  placeholder="Адрес доставки"
                  className="form-control"
                />
              </div>
              <div className="form-group form-check">
                <input
                  id="agreement"
                  type="checkbox"
                  checked={agreement}
                  onChange={handleChangeAgreement}
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
              </div>
              {!loading && (
                <button
                  type="submit"
                  className="btn btn-outline-secondary"
                  disabled={!phone || !address || !agreement || !cart.length}
                >
                  Оформить
                </button>
              )}
              {loading && <Preloader />}
              {error && <p className="mt-3 text-danger">Ошибка при оформлении заказа. Пожалуйста, попробуйте ещё раз.</p>}
            </form>
          </div>
        </>
      )}
    </section>
  );
};
