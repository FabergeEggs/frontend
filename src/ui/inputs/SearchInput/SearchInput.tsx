import styles from "./SearchInput.module.css";
import SearchImage from '@/public/assets/feed/search.svg'
import Image from "next/image";
import { useState } from "react";

import { ChangeHandler, RefCallBack } from "react-hook-form";

interface SearchInputProps {
  name?: string;
  placeholder?: string;
  onChange?: ChangeHandler | ((e: React.ChangeEvent<HTMLInputElement>) => void);
  onFocus?: () => void;
  onBlur?: ChangeHandler | (() => void);
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  ref?: RefCallBack;
  className?: string;
}

export default function SearchInput({
    placeholder = "Хочу найти...",
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    name,
    ref,
  }: SearchInputProps) {

  return (
  <div className={`basic-input-container ${styles.container} ${styles.inputContainer}`}>
        <input
          className={`basic-input ${styles.input}`}
          onChange={(e) => onChange?.(e)}
          onFocus={onFocus}
          onBlur={onBlur}
          id={name}
          placeholder={placeholder}
          autoComplete="new-password"
          onKeyDown={onKeyDown}
          ref={ref}
          name={name}
        />
        <div onClick={() => { console.log("Searching...")}} className={styles.imageContainer}>
          <Image src={SearchImage} alt="Search" />
        </div>
  </div>)
}
