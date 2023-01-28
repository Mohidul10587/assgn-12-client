import { sendPasswordResetEmail } from 'firebase/auth';
import React from 'react'
import { useForm } from 'react-hook-form';
import auth from './firebase.init';

const ResetPassword = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
// 01792103358

    const onSubmit = data => {

     sendPasswordResetEmail(auth , data.email)
     alert('check your email for reset password')

    }

  return (
    <div className='flex justify-center items-center'>
    <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
        <h2 className="text-center text-xl">Reset Password</h2>

            <form onSubmit={handleSubmit(onSubmit)}>


                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>

                    </label>
                    <input

                        type="email"
                        placeholder="Email"
                        className="input input-bordered border-black w-full max-w-xs"

                        {...register("email", {
                            required: {
                                value: true,
                                message: 'This is required field'
                            },
                            pattern: {
                                value: /[A-Za-z]{3}/,
                                message: 'This is wrong email'
                            }
                        })} />

                    <label className="label">

                        {errors.email?.type === 'required' && <span className='text-red-500'>{errors.email?.message}</span>}
                        {errors.email?.type === 'pattern' && <span className='text-red-500'>{errors.email?.message}</span>}
                    </label>

                </div>


              
           
                <button
                    type="submit"
                    className="btn btn-outline w-full hover:bg-teal-700">Submit</button>


            </form>


           



        </div>
    </div>
</div>
  )
}

export default ResetPassword