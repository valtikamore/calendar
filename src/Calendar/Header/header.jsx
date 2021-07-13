
import '../Calendar.module.scss'
import arrowRight from '../../assets/Vector.svg'
import arrowLeft from '../../assets/Vector1.svg'
import styles from './styles.module.scss'

export const Heading = ({date, changeMonth, resetDate}) => (
    <nav className={styles.navigation}>
        <div className={styles.navigationWrapper}>
            <a onClick={() => changeMonth(date.month() - 1)}><img src={arrowLeft} alt="arrow"/></a>
            <h3 onClick={() => resetDate()}>{date.format('MMMM')} {date.format('YYYY')}</h3>
            <a onClick={() => changeMonth(date.month() + 1)}><img src={arrowRight} alt="arrow"/></a>
        </div>
    </nav>
);
