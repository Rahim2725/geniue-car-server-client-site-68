import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useServiceDetails from '../../hooks/useServiceDetails';

const Checkout = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetails(serviceId);
    const [user] = useAuthState(auth);

    const handlePlaceOrder = event => {
        event.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value,
        }
        fetch('https://protected-lowlands-54831.herokuapp.com/order', {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(order)
        })
          /*   .then(res => res.json())
            .then(data => {
                const order = data.insertedId;
                if (order) {
                    toast('Your Order is  Booked !!!')
                    event.target.reset();
                }

            }) */

          axios.post('https://protected-lowlands-54831.herokuapp.com/order', order)
          .then(response => {
              console.log(response);
              const {data} = response;
              if(data.insertedId){
                  toast('Your Order is  Booked!!')
                  event.target.reset();
              }
          })
    }
    return (
        <div className='w-50 mt-5 mx-auto text-center'>
            <h2 className='mb-5'>Please Order : {service.name}</h2>
            <form onSubmit={handlePlaceOrder}>
                <input className='mb-3 p-2 w-50' value={user?.displayName} type="text" name='name' placeholder='Name' required readOnly disabled />
                <br />
                <input className='mb-3 p-2 w-50' value={user?.email} type="email" name='email' required placeholder='Email' readOnly disabled />
                <br />
                <input className='mb-3 p-2 w-50' type="text" value={service?.name} name='service' required placeholder='Service' readOnly />
                <br />
                <input className='mb-3 p-2 w-50' type="text" name='address' required placeholder='Address' autoComplete='off' />
                <br />
                <input className='mb-3 p-2 w-50 ' type="text" name='phone' required placeholder='Phone' autoComplete='off' />
                <br />
                <input className='btn btn-primary p-2 w-50' type="submit" value="Place Order" />
            </form>
        </div>
    );
};

export default Checkout;