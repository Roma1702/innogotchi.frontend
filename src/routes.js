import { ACCOUNT_DETAILS_ROUTE, FARM_ROUTE, HOME_ROUTE, INNOGOTCHI_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"
import { Home } from "./components/Home/Home"
import { Farm } from "./components/Farms/Farm"
import { Innogotchi } from "./components/Innogotchi/Innogotchi"
import { Auth } from "./pages/Auth"
import { AccountDetails } from "./components/AccountDetails/AccountDetails"

export const authRoutes = [
    {
        path: FARM_ROUTE,
        Component: Farm
    },
    {
        path: INNOGOTCHI_ROUTE,
        Component: Innogotchi
    },
    {
        path: ACCOUNT_DETAILS_ROUTE,
        Component: AccountDetails
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: HOME_ROUTE,
        Component: Home
    }
]