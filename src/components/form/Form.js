import React, { useRef } from "react";
import form from "./Form.module.css";

const Form = () => {
    const enteredTitle = useRef();
    const enteredOpeningText = useRef();
    const enteredReleaseDate = useRef();

    const submitFormHandler = (e) => {
        e.preventDefault();
        const newMovieObj = {
            title: enteredTitle.current.value,
            openingText: enteredOpeningText.current.value,
            releaseDate: enteredReleaseDate.current.value
        }
        console.log(newMovieObj);
        enteredTitle.current.value = '';
        enteredOpeningText.current.value = '';
        enteredReleaseDate.current.value = '';
    }

  return (
    <form className={form.container} onSubmit={submitFormHandler}>
      <label>Title</label>
      <input id="title" type="text" ref={enteredTitle}/>
      <label>Opening Text</label>
      <input id="openingtext" type="text" className={form.openingText} ref={enteredOpeningText}/>
      <label>Release Date</label>
      <input id="releasedate" type="date" ref={enteredReleaseDate}/>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default Form;
