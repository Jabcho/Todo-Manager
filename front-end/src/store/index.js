import { createStore } from 'vuex';

import userStore from '@/store/modules/userStore';
import mainStore from '@/store/modules/mainStore';

const store = createStore({
    modules: {
        userStore: userStore,
        mainStore: mainStore
    }
});

export default store;

