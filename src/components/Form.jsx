import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '@mui/material/TextField';
import { formSchema } from '../config/formValidation';
import { submitForm } from '../state/formSlice';
import Autocomplete from '@mui/material/Autocomplete';
import laptopImage from "../assets/laptop.jpg";
import smartphoneImage from "../assets/smartphone.jpeg";
import tabletImage from "../assets/tablet.jpg";
import smartwatchImage from "../assets/Smartwatch.jpg";
import headphonesImage from "../assets/headphones.png";

const products = [
    {
      product_id: 1,
      name: "Laptop",
      picture: laptopImage,
      stock: 10,
      price: "999.99"
    },
    {
      product_id: 2,
      name: "Smartphone",
      picture: smartphoneImage,
      stock: 15,
      price: "599.99"
    },
    {
      product_id: 3,
      name: "Tablet",
      picture: tabletImage,
      stock: 20,
      price: "399.99"
    },
    {
      product_id: 4,
      name: "Smartwatch",
      picture: smartwatchImage,
      stock: 30,
      price: "199.99"
    },
    {
      product_id: 5,
      name: "Headphones",
      picture: headphonesImage,
      stock: 50,
      price: "89.99"
    }
  ];
  
export default function InvoiceForm() {
  const dispatch = useDispatch();
  const { control, handleSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: '',
      customer_name: '',
      salesperson_name: '',
      notes: '',
      products: [{ product_id: '', quantity: 1 }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });
  const status = useSelector((state) => state.form.status);
  const error = useSelector((state) => state.form.error);

  const onSubmit = (data) => {
    dispatch(submitForm(data));
  };

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (status === 'succeeded') {
      setShowSuccessModal(true);
    }
  }, [status]);

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };
 
  return (
    <form className='flex flex-col justify-center' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col justify-around'>
        <TextField
          {...register('date')}
          type="date"
          error={!!errors.date}
          helperText={errors.date?.message}
          style={{ width: "350px", margin: "5px" }}
        />
        <TextField
          {...register('customer_name')}
          label="Customer Name"
          error={!!errors.customer_name}
          helperText={errors.customer_name?.message}
          style={{ width: "350px", margin: "5px" }}
        />
      </div>
      <div className='flex flex-col justify-around'>
        <TextField
          {...register('salesperson_name')}
          label="Salesperson Name"
          error={!!errors.salesperson_name}
          helperText={errors.salesperson_name?.message}
          style={{ width: "350px", margin: "5px" }}
        />
        <TextField
          {...register('notes')}
          label="Notes"
          multiline
          rows={4}
          error={!!errors.notes}
          helperText={errors.notes?.message}
          style={{ width: "350px", margin: "5px" }}
        />
      </div>
      {fields.map((item, index) => (
        <div key={item.id}>
            <Controller
            name={`products.${index}.product_id`}
            control={control}
            render={({ field }) => (
              <Autocomplete
              {...field}
              options={products}
              getOptionLabel={(option) => option ? option.name : ""}
              isOptionEqualToValue={(option, value) => option.product_id === value}
              renderOption={(props, option) => (
                <li {...props}>
                   <img src={option.picture} alt={option.name} width="40" height="40" style={{ marginRight: 10 }} />
                  {option.name} - Stock: {option.stock} - Price: ${option.price}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select a product"
                  error={!!errors.products?.[index]?.product_id}
                  helperText={errors.products?.[index]?.product_id?.message || ''}
                  sx={{ mt: 2, mb: 2 }} 
                  />
              )}
              value={products.find(product => product.product_id === field.value) || null}
              onChange={(_, newValue) => field.onChange(newValue ? newValue.product_id.toString() : '')}
              />
            )}
          />
          <div className='flex flex-row'>
            <Controller
              name={`products.${index}.quantity`}
              control={control}
              render={({ field }) => (
                  <TextField
                  {...field}
                  type="number"
                  label="Quantity"
                  error={!!errors.products?.[index]?.quantity}
                  helperText={errors.products?.[index]?.quantity?.message}
                  style={{ width: "350px", margin: "5px" }}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? "" : Number(value)); 
                  }}
                />
              )}
            />
            <button className="btn btn-accent mt-2" onClick={() => remove(index)}>Remove</button>
          </div>
        </div>
      ))}
        <button className="btn btn-accent my-2" onClick={() => append({ product_id: '', quantity: 1 })}>Add Product</button>
        <button className="btn btn-accent my-3" type="submit" disabled={status === 'loading'}>Submit</button>
      {status === 'failed' && <div>Error: {error}</div>}
         {showSuccessModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Success!</h3>
            <p className="py-4">Invoice submitted successfully!</p>
            <div className="modal-action">
              <button className="btn btn-accent" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
