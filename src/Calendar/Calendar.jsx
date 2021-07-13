import {Heading} from "./Header/header";
import {Days} from "./Days/days";
import moment from 'moment'
import React from 'react'
import styles from './Calendar.module.scss'

export class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment(),
            startDate: moment().subtract(0, 'day'),
            endDate: moment().add(0, 'day')
        };
    }

    resetDate() {
        this.setState({
            date: moment()
        });
    }

    changeMonth(month) {
        const {date} = this.state;

        date.month(month);

        this.setState(
            moment(date)
        );
    }

    changeDate(date) {
        let {startDate, endDate} = this.state;

        if (startDate === null || date.isBefore(startDate, 'day') || ! startDate.isSame(endDate, 'day')) {
            startDate = moment(date);
            endDate = moment(date);
        } else if (date.isSame(startDate, 'day') && date.isSame(endDate, 'day')) {
            startDate = null;
            endDate = null;
        } else if (date.isAfter(startDate, 'day')) {
            endDate = moment(date);
        }

        this.setState({
            startDate,
            endDate
        });
    }

    render() {
        const {date, startDate, endDate} = this.state;
        return (
                <div className={styles.calendar}>
                    <Heading date={date} changeMonth={(month) => this.changeMonth(month)} resetDate={() => this.resetDate()} />

                    <Days onClick={(date) => this.changeDate(date)}
                          date={date.format()} startDate={startDate}
                          endDate={endDate} />

                </div>


        );
    }
}
