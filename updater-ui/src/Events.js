import EventEmitter from 'events';

class __Events extends EventEmitter {

    constructor() {
        super();
    }

    all = {
        'REFRESH_ALL': 'REFRESH_ALL',
        'SYNC_ALL': 'SYNC_ALL',
        'REFRESH': 'REFRESH',
        'SYNC': 'SYNC',
    }
}

const Events = new __Events();
export default Events;