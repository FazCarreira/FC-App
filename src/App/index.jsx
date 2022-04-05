import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import adminTheme from './theme/admin';
import alunoTheme from './theme/aluno';
import facilitadorTheme from './theme/facilitador';
import empresaTheme from './theme/empresa';

import PrivateRoute from './components/PrivateRoute';

import { ConstantsContext } from '../services/ConstantsContext';

import NotFound from '../pages/404';
import Login from '../pages/auth';

const App = () => {

    const { NavItems } = useContext(ConstantsContext);

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Login />} />
                <Route path="*" element={<NotFound />} />
                {NavItems.admin.map(route => route?.path ? (
                    <Route key={route?.path} path={route?.path} element={<PrivateRoute theme={adminTheme} disableHeader={route?.disableHeader} disableNav={route?.disableNav} title={route?.title} exact path={route?.path} component={route?.component} role="admin" />} />
                ) : route?.items ? (
                    route?.items.map(r => <Route key={r.path} path={r.path} element={<PrivateRoute disableHeader={route?.disableHeader} disableNav={route?.disableNav} title={r.title} exact path={r.path} component={r.component} role="admin" />} />)
                ) : false
                )}
                {NavItems.aluno.map(route => route?.path ? (
                    <Route key={route?.path} path={route?.path} element={<PrivateRoute theme={alunoTheme} disableHeader={route?.disableHeader} disableNav={route?.disableNav} title={route?.title} exact path={route?.path} component={route?.component} headerRight={route?.headerRight} role="aluno" />} />
                ) : route?.items ? (
                    route?.items.map(r => <Route key={r.path} path={r.path} element={<PrivateRoute disableHeader={route?.disableHeader} disableNav={route?.disableNav} title={r.title} exact path={r.path} component={r.component} role="aluno" />} />)
                ) : false
                )}
                {NavItems.facilitador.map(route => route?.path ? (
                    <Route key={route?.path} path={route?.path} element={<PrivateRoute theme={facilitadorTheme} disableHeader={route?.disableHeader} disableNav={route?.disableNav} title={route?.title} exact path={route?.path} component={route?.component} headerRight={route?.headerRight} role="facilitador" />} />
                ) : route?.items ? (
                    route?.items.map(r => <Route key={r.path} path={r.path} element={<PrivateRoute disableHeader={route?.disableHeader} disableNav={route?.disableNav} title={r.title} exact path={r.path} component={r.component} role="facilitador" />} />)
                ) : false
                )}
                {NavItems.empresa.map(route => route?.path ? (
                    <Route key={route?.path} path={route?.path} element={<PrivateRoute theme={empresaTheme} disableHeader={route?.disableHeader} disableNav={route?.disableNav} title={route?.title} exact path={route?.path} component={route?.component} headerRight={route?.headerRight} role="empresa" />} />
                ) : route?.items ? (
                    route?.items.map(r => <Route key={r.path} path={r.path} element={<PrivateRoute disableHeader={route?.disableHeader} disableNav={route?.disableNav} title={r.title} exact path={r.path} component={r.component} role="empresa" />} />)
                ) : false
                )}
            </Routes>
        </Router>
    );
}

export default App;