import React from 'react';
import uniqid from 'uniqid';
import './MarineData.scss';

export default function MarineData(hourlyData) {
    return (
        <div className='data'>
            <div className='data__titles'>
                <h6 className='data__title'>Time <br/>(24hr)</h6>
                <h6 className='data__title'>Swell <br/>Direction</h6>
                <h6 className='data__title'>Swell <br/>Height</h6>
                <h6 className='data__title'>Swell <br/>Period</h6>
                <h6 className='data__title'>Water <br/>Temp</h6>
            </div>

            {hourlyData.hourlyData.map((hour) => {
                return (
                    <div key={uniqid()} className='data__container'>
                        <p className='data__info'>{hour.time}</p>
                        <p className='data__info'>{hour.swellDir16Point}</p>
                        <p className='data__info'>{hour.swellHeight_ft}ft</p>
                        <p className='data__info'>{hour.swellPeriod_secs}s</p>
                        <p className='data__info'>{hour.waterTemp_C}°C / {hour.waterTemp_F}°F</p>
                    </div>
                )
            })}
        </div>
    );
}
