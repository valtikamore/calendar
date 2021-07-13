import {Day} from "./day";
import styles from './days.module.scss'
import moment from 'moment'
import {useEffect, useState} from "react";
moment.lang("en-US")

const format = "MM-DD dddd"

export const Days = ({date, startDate, endDate, onClick}) => {
    const [dates, setDates] = useState([]);

    useEffect(() => {
        console.log('useEffect => ', date)
        getCalendar(date)
    }, [date])

    const getWeek = (startDate) => {
        let res = [];
        for (let i = 0; i < 7; i++) {
            res.push(moment(startDate).add(i, 'day'))
        }
        return res;
    }

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
    let labels = moment.weekdaysShort();

    return (
        <div className={styles.calendarBody}>
            <div className={styles.labels}>
                {labels.map(day => {
                    return <span key={day} className={styles.label}>{day}</span>
                })}
            </div>
            <div className={styles.dates}>
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

        </div>
    );
};
