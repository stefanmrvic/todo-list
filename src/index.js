import './styles/styles.scss';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faCheckDouble, faCalendarDays, faCalendarWeek, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

library.add(faCheckDouble, faCalendarDays, faCalendarWeek, faCalendarPlus, faCalendar);

dom.watch();