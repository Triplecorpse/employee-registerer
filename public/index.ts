import {getRoute} from "./route-resolver";

function getMessage() {
    const route = getRoute();

    switch (route) {
        case 'pi':
            //I am on PI page
            break;
        case 'add':
            //I am on ADD page
            break;
        case 'view':
            //I am on VIEW page
            break;
        case 'current-session':
            //I am on CURRENT_SESSION page
            break;
        default:
            return;
    }
}
