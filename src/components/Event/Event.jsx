import React from 'react';
import './Event.scss';

const Event = () => {
    var events = [
        {
            id: 1,
            eventName: 'Hướng dẫn sử dụng hệ thống HUTECH eLearning cho tân sinh viên khóa 2025.',
            weekDate: 'Thứ 2',
            date: '01/09/2025   ',
        },
        {
            id: 2,
            eventName: 'Tập huấn vận hành khóa học điện tử trên hệ thống Hutech eLearning - HK1/ 2025-2026 dành cho Giảng viên.',
            weekDate: 'Thứ 7',
            date: '23/08/2025 08:30',
        },
        {
            id: 3,
            eventName: 'Hướng dẫn quay - dựng video bài giảng điện tử dành cho giảng viên.',
            weekDate: 'Thứ 6',
            date: '15/08/2025 14:30',
        },
    ];

    return (
        <>
        {
            events.map(i => (
                <div key={i.id}>
                    <div className="event-item d-flex flex-column flex-lg-row align-items-start">
                        <div className="event-date">
                            <div className="week-date">{i.weekDate}</div>
                            <div className="date">{i.date.toString("dd/MM/yyyy")}</div>
                        </div>
                        <div className="event-name pl-lg-3">{i.eventName}</div>
                    </div>
                    <div className="event-line"></div>
                </div>
            ))
        }
        </>
    )
};

export default Event;