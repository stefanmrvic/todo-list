import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faCheckDouble, faCalendarDays, faCalendarWeek, faCalendarPlus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons';

library.add(faCheckDouble, faCalendarDays, faCalendarWeek, faCalendarPlus, faCalendar, faCirclePlus, faTrashCan, faPenToSquare);
dom.watch();