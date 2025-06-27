import { library, dom } from '@fortawesome/fontawesome-svg-core';
import * as icon from "./icons.js";

library.add(
    icon.faCheckDouble, 
    icon.faCalendarDays, 
    icon.faCalendarWeek, 
    icon.faCalendarPlus, 
    icon.faCalendar, 
    icon.faCirclePlus, 
    icon.faTrashCan, 
    icon.faPenToSquare, 
    icon.faCircle, 
    icon.faCircleCheck, 
    icon.faCircleInfo,
    icon.faXmark, 
    icon.faPagelines, 
    icon.faBook, 
    icon.faScrewdriverWrench, 
    icon.faVolleyball, 
    icon.faSackDollar,
    icon.faPizzaSlice, 
    icon.faSuitcaseRolling, 
    icon.faGift
);

dom.watch()

// export const fontAwesomeReady = Promise.resolve();