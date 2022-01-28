import React from 'react';
import './MarineData.scss';

export default function MarineData(hourlyData) {

    console.log(hourlyData);

    return (
        <div className='data'>
            <h1>Hello Marine Data!</h1>
            <div className='data__titles'>
                <h6 className='data__title'>Time</h6>
                <h6 className='data__title'>Swell Direction</h6>
                <h6 className='data__title'>Swell Height</h6>
                <h6 className='data__title'>Swell Period</h6>
                <h6 className='data__title'>Water Temp</h6>
            </div>
            
            <div className='data__container'>
                <p className='data__info'>0600</p>
                <p className='data__info'>NE</p>
                <p className='data__info'>3 feet</p>
                <p className='data__info'>4.8s</p>
                <p className='data__info'>20°C</p>
            </div>
        </div>
    );
}
