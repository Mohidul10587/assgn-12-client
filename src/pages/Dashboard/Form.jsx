import React from 'react'
import { useForm } from 'react-hook-form';

import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../Authentication/firebase.init';
import { toast } from 'react-toastify';


const Form = () => {

  const [user] = useAuthState(auth)
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const imageStorageKey = '6c0277e2286d8c4a1059080d1574e2a7'


  const onSubmit = async data => {
  
    const image = data.image[0]
    console.log(image)
    const formData = new FormData();
    formData.append('image', image)


    fetch(`https://api.imgbb.com/1/upload?key=${imageStorageKey}`, {
      method: 'POST',
      body: formData
    }).then(res => res.json())
      .then(result => {
        if (result.success) {

          const imgUrl = result.data.url

          fetch('https://tools-house.onrender.com/tools', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },

            body: JSON.stringify({
              name: data.name,
              price: data.price,
              minOrderQuantity: data.minOrderQuantity,
              quantity: data.quantity,
              description: data.description,
              img: imgUrl,
              email: user.email
            })
          })
            .then(res => res.json())
            .then((data) => {

              if (data.acknowledged) {
                toast.success('Your product added successfully')
              
              } else {
                toast.error('Sorry the product does not added. Please try again')
              }

            })
        }
      })

  }

  return (
    <div className='flex justify-center  min-h-screen'>

      <div className=''>
        <form onSubmit={handleSubmit(onSubmit)} className='border-[1px] border-teal-800 px-10 pb-4 rounded-lg'>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name of Item</span>

            </label>
            <input

              type="text"
              placeholder="Name"
              className="input input-bordered border-black w-full max-w-xs"

              {...register("name", {
                required: {
                  value: true,
                  message: 'This is required field'
                }

              })} />

            <label className="label">

              {errors.name?.type === 'required' && <span className='text-red-500'>{errors.name?.message}</span>}

            </label>

          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Price</span>

            </label>
            <input

              type="number"
              placeholder="Price"
              className="input input-bordered border-black w-full max-w-xs"

              {...register("price", {
                required: {
                  value: true,
                  message: 'This is required field'
                }

              })} />

            <label className="label">

              {errors.price?.type === 'required' && <span className='text-red-500'>{errors.price?.message}</span>}

            </label>

          </div>




          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Minimum order Quantity</span>

            </label>
            <input

              type="number"
              placeholder="Price"
              className="input input-bordered border-black w-full max-w-xs"

              {...register("minOrderQuantity", {
                required: {
                  value: true,
                  message: 'This is required field'
                }

              })} />

            <label className="label">

              {errors.price?.type === 'required' && <span className='text-red-500'>{errors.price?.message}</span>}

            </label>

          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text"> Available Quantity</span>

            </label>
            <input

              type="number"
              placeholder="Price"
              className="input input-bordered border-black w-full max-w-xs"

              {...register("quantity", {
                required: {
                  value: true,
                  message: 'This is required field'
                }

              })} />

            <label className="label">

              {errors.price?.type === 'required' && <span className='text-red-500'>{errors.price?.message}</span>}

            </label>

          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Description</span>

            </label>
            <input

              type="text"
              placeholder="Name"
              className="input input-bordered border-black w-full max-w-xs"

              {...register("description", {
                required: {
                  value: true,
                  message: 'This is required field'
                }

              })} />

            <label className="label">

              {errors.name?.type === 'required' && <span className='text-red-500'>{errors.name?.message}</span>}

            </label>

          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Photo</span>

            </label>
            <div className='border-[1px] p-2 rounded-md border-black'>
              <input
                type="file"

                {...register("image", {
                  required: {
                    value: true,
                    message: 'This is required field'
                  }
                })} />
            </div>
            <label className="label">
              {errors.image?.type === 'required' && <span className='text-red-500'>{errors.image?.message}</span>}
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-outline w-80 mt-10 hover:bg-teal-700">Add</button>


        </form>
      </div>
    </div>
  )
}

export default Form
