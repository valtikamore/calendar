import moment from 'moment'
import './styles.scss'
export const Day = ({currentDate, date, startDate, endDate, onClick}) => {
    let className = [];

    if (moment().isSame(date, 'day')) {
        className.push('active');
    }

    if (date.isSame(startDate, 'day')) {
        className.push('start');
    }

    if (date.isBetween(startDate, endDate, 'day')) {
        className.push('between');
    }

    if (date.isSame(endDate, 'day')) {
        className.push('end');
    }

    if (!date.isSame(currentDate, 'month')) {
        className.push('muted');
    }

    return (
        <span onClick={() => onClick(date)} currentDate={date} className={className.join(' ')}>{date.date()}</span>
    )
};
