import React from 'react';
import useServices from '../hooks/hooks';

const MangeServices = () => {
    const [services, setServices] = useServices();

    const handleDelete = id => {
        const proceed = window.confirm('Aer You Sure?')
        if(proceed){
            fetch(`https://protected-lowlands-54831.herokuapp.com/service/${id}`, {
                method: 'DELETE',
            })
            .then(res => res.json())
            .then(data => {
                const remaining = services.filter(service => service._id !== id);
                setServices(remaining)
            })
        }
    }
     return (
        <div className='text-center'>
            <h1>Mange Services</h1>
            <div className=''>
                {
                    services.map(service => <div
                        key={service._id}>
                        <h4>{service.name} <button onClick={() => handleDelete(service._id)}>X</button></h4>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MangeServices;