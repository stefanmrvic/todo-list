import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { 
    faCheckDouble,        // Logo icon
    faCalendarDays,       // Due #1
    faCalendarWeek,       // Due #2
    faCalendarPlus,       // Due #3
    faCirclePlus,         // Add button
    faCircleInfo,         // Task info
    faXmark,              // Close modal
    faBook,               // #2 Project Icon
    faScrewdriverWrench,  // #3 Project Icon
    faVolleyball,         // #4 Project Icon
    faSackDollar,         // #5 Project Icon
    faPizzaSlice,         // #6 Project Icon
    faSuitCaseRolling,    // #7 Project Icon
    faGift                // #8 Project Icon
} from '@fortawesome/free-solid-svg-icons';

import { 
    faCalendar,     // Show all button
    faTrashCan,     // Delete buttons
    faPenToSquare,  // Change buttons
    faCircle,       // Task item (undone)
    faCircleCheck   // Task item (done)
} from '@fortawesome/free-regular-svg-icons';

import {
    faPageLines,  // #1 Project Icon
} from '@fortawesome/free-brands-svg-icons';

library.add(
    faCheckDouble, faCalendarDays, faCalendarWeek, faCalendarPlus, faCalendar, 
    faCirclePlus, faTrashCan, faPenToSquare, faCircle, faCircleCheck, faCircleInfo,
    faXmark, faPageLines, faBook, faScrewdriverWrench, faVolleyball, faSackDollar,
    faPizzaSlice, faSuitCaseRolling, faGift

);

dom.watch();