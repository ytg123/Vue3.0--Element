import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import TerryButton from './plugins/button/index.js'
import TerryButtonButtonGroup from './plugins/button-group/index.js'
import TerryBadge from './plugins/badge/index.js'
import TerryAlert from './plugins/alert/index.js'
import TerryLink from './plugins/link/index.js'
import TerryProgress from './plugins/progress/index.js'
import TerryTag from './plugins/tag/index.js'
import TerryAvatar from './plugins/avatar/index.js'
import TerryBacktop from './plugins/backtop/index.js'
import TerryBreadcrumb from './plugins/breadcrumb/index.js'
import TerryBreadcrumbItem from './plugins/breadcrumb-item/index.js'

import '/index.css'

createApp(App).
use(router).
use(store).
use(TerryButton).
use(TerryButtonButtonGroup).
use(TerryBadge).
use(TerryAlert).
use(TerryLink).
use(TerryProgress).
use(TerryTag).
use(TerryAvatar).
use(TerryBacktop).
use(TerryBreadcrumb).
use(TerryBreadcrumbItem).
mount('#app')
