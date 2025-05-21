import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faCheckDouble, faCalendarDays, faCalendarWeek, faCalendarPlus, faCirclePlus, faCircleInfo, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faTrashCan, faPenToSquare, faCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons';

library.add(
    faCheckDouble, faCalendarDays, faCalendarWeek, faCalendarPlus, faCalendar, 
    faCirclePlus, faTrashCan, faPenToSquare, faCircle, faCircleCheck, faCircleInfo,
    faXmark
);
dom.watch();