import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useServiceDetails from '../hooks/useServiceDetails';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const [service, setService]= useServiceDetails(serviceId);

    const { img, description, name, price } = service;
    console.log(service)
    return (
        <div>
            <h2 className='text-center mt-2'>You are about Book: {name}</h2>
            <div className='text-center mt-5'>
                <div className='mb-5'>
                    <img src={img} alt="" />
                </div>
                <Link to={`/checkout/${serviceId}`}>
                    <button className='btn btn-primary'>Proceed Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceDetail;