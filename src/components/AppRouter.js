import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Context } from "..";
import { authRoutes, publicRoutes } from "../routes";
import { HOME_ROUTE } from "../utils/consts";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    console.log(user)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={ <Component/> }/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={ <Component/> }/>
            )}
            <Route path='*' element={<Navigate to={HOME_ROUTE}/>} />            
        </Routes>
    );
});

export default AppRouter;