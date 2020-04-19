import React from "react";

const Form = props => (
  <form onSubmit={ props.weather }>
    <input type="text" name='city' placeholder='City'/>
    <button>I want to know a weather</button>
  </form>
);

export default Form;
