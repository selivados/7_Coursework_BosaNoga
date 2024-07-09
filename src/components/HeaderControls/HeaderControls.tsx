import { FC, ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CartIcon } from "../CartIcon";
import { setSearchText } from "../../redux/slices/catalogSlice";
import { useAppDispatch } from "../../hooks";

import "./headerControls.css";

export const HeaderControls: FC = () => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const text = value.trim();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleClick();
  };

  const handleClick = () => {
    if (!visible) {
      setValue("");
      setVisible(true);
      return;
    }

    if (text) {
      setValue("");
      setVisible(false);
      dispatch(setSearchText(text));
      navigate("/catalog");
      return;
    }

    setVisible(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <div className="header-controls-pics">
        <div
          data-id="search-expander"
          onClick={handleClick}
          className="header-controls-pic header-controls-search"
        ></div>
        <CartIcon />
      </div>
      {visible && (
        <form
          data-id="search-form"
          onSubmit={handleSubmit}
          className="header-controls-search-form form-inline"
        >
          <input
            value={value}
            onChange={handleChange}
            placeholder="Поиск"
            className="form-control"
          />
        </form>
      )}
    </div>
  );
};
