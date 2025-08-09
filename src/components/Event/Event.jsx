import React from 'react';
import './Event.scss';

const Event = () => {
    var eventList = [
        {
            id: 1,
            eventName: 'Khóa học trực tuyến mở rộng MOOC “Nữ giới và năng lực lãnh đạo” sẽ chính thức khởi động vào 20/7 tới',
            date: new Date(2025,6,17),
        },
        {
            id: 2,
            eventName: 'Khóa học trực tuyến mở rộng MOOC “Nữ giới và năng lực lãnh đạo” sẽ chính thức khởi động vào 20/7 tới',
            date: new Date(2025,6,17),
        },
        {
            id: 3,
            eventName: 'Khóa học trực tuyến mở rộng MOOC “Nữ giới và năng lực lãnh đạo” sẽ chính thức khởi động vào 20/7 tới',
            date: new Date(2025,6,17),
        },
    ];

    return (
        <>
        {
            eventList.map(i => (
                <div key={i.id}>
                    <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center event-item">
                        <div className="event-date text-left pr-lg-3">{i.date.toLocaleDateString("vi-VN")}</div>
                        <div className="event-name pl-lg-3 text-justify">{i.eventName}</div>
                    </div>
                    <div className="event-line"></div>
                </div>
            ))
        }
        </>
    )
};

export default Event;