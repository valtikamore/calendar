import {Day} from "./day";
import './styles.scss'
import moment from 'moment'
import {useEffect, useState} from "react";

moment.lang("en-US")

const format = "MM-DD dddd"

export const Days = ({date, startDate, endDate, onClick}) => {

    let labels = moment.weekdaysShort();
    const [dates, setDates] = useState([]);


    const getWeek = (startDate) => {
        let res = [];
        for (let i = 0; i < 7; i++) {
            res.push(moment(startDate).add(i, 'day'))
        }
        return res;
    }

    useEffect(() => {
        console.log('useEffect => ', date)
        getCalendar(date)
    }, [date])

    const getCalendar = (date = moment()) => {
        const firstDayDate = moment(date).startOf('month');
        const thisMonthLastDate = moment(date).daysInMonth();
        const previousMonth = moment(date).subtract(1, 'month');
        const previousMonthDays = previousMonth.daysInMonth();
        const firstDayCalendar = firstDayDate.day() === 0
            ? 0 : previousMonthDays - firstDayDate.day() + 1
        console.log('firstDayCalendar => ', firstDayCalendar)
        console.log('firstDayDate', firstDayDate.format(format))

        const lastDate = moment(date).set('date', thisMonthLastDate);
        let res = [];
        while (!res[res.length - 1] || moment(res[res.length - 1]).isBefore(lastDate)) {
            const asd = !res.length
                ? firstDayCalendar === 0 ? firstDayDate : previousMonth.set('date', firstDayCalendar)
                : moment(res[res.length - 1]).add(1, 'day');

            console.log(asd.format(format))
            let week = getWeek(asd);

            res = [...res, ...week];
        }
        setDates(res);
        console.log(res.map(d => d.format(format)))
    };

    return (
        <nav className="calendar--days">
            <div className='labels--block'>
                {labels.map(day => {
                    return <span key={day} className='label'>{day}</span>
                })}
            </div>
            <div className='dates--block'>
                {dates.map(d => (
                    <Day
                        key={d.format('DD MM YYYY')}
                        onClick={() => onClick(d)}
                        currentDate={moment(date)}
                        date={moment(d)}
                        startDate={startDate}
                        endDate={endDate}
                    />
                ))}
            </div>

        </nav>
    );
};
