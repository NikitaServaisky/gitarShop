import React from "react";
import { useState } from "react";

const Form = ({fields, onSubmit}) => {
    const [formData, setFormData] = useState(
        fields.reduce((acc, fields) => ({ ...acc, [fields.name]: '' }), {})
    );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleSubmit = () => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name}>
            <label>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    );
}
export default Form;