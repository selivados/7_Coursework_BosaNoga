import { FC, FormEvent, ChangeEvent, useState, useEffect } from "react";

import { catalogState, setSearchText } from "../../redux/slices/catalogSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

import "./searchForm.css";

export const SearchForm: FC = () => {
  const { searchText } = useAppSelector(catalogState);
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchText(""));
    };
  }, []);

  useEffect(() => {
    setValue(searchText);
  }, [searchText]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = value.trim();
    dispatch(setSearchText(text));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="catalog-search-form form-inline"
    >
      <input
        value={value}
        onChange={handleChange}
        placeholder="Поиск"
        className="form-control"
      />
    </form>
  );
};
