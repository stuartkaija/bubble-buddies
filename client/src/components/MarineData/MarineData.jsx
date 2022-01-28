import React from 'react';
import uniqid from 'uniqid';
import './MarineData.scss';

export default function MarineData(hourlyData) {

    console.log(hourlyData.hourlyData);

    return (
        <div className='data'>
            <div className='data__titles'>
                <h6 className='data__title'>Time (24hr)</h6>
                <h6 className='data__title'>Swell Direction</h6>
                <h6 className='data__title'>Swell Height</h6>
                <h6 className='data__title'>Swell Period</h6>
                {/* <h6 className='data__title'>Water Temp</h6> */}
            </div>

            {hourlyData.hourlyData.map((hour) => {
                return (
                    <div key={uniqid()} className='data__container'>
                        <p className='data__info'>{hour.time}</p>
                        <p className='data__info'>{hour.swellDir16Point}</p>
                        <p className='data__info'>{hour.swellHeight_ft}ft</p>
                        <p className='data__info'>{hour.swellPeriod_secs}s</p>
                        {/* <p className='data__info'>{hour.waterTemp_C}°C</p> */}
                    </div>
                )
            })}
        </div>
    );
}
