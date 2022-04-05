import { ThemeProvider, CssBaseline } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterMoment from '@mui/lab/AdapterMoment';

import theme from '../App/theme';
import { ToolsContextProvider } from './ToolsContext';
import { AuthenticationContextProvider } from './AuthContext';
import { ConstantsContextProvider } from './ConstantsContext';
import { SiteContextProvider } from './SiteContext';
import { AdminContextProvider } from './AdminContext';
import { TrilhaContextProvider } from './TrilhaContext';
import 'moment/locale/pt-br';
import moment from 'moment';
import { UserContextProvider } from './UserContext';
import { TreinamentoContextProvider } from './TreinamentoContext';
import { PdfContextProvider } from './PdfContext';

const Contexts = ({ children }) => {
    moment.locale('pt-br');
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <ToolsContextProvider>
                    <AuthenticationContextProvider>
                        <ConstantsContextProvider>
                            <SiteContextProvider>
                                <AdminContextProvider>
                                    <UserContextProvider>
                                        <TrilhaContextProvider>
                                            <TreinamentoContextProvider>
                                                <PdfContextProvider>
                                                    {children}
                                                </PdfContextProvider>
                                            </TreinamentoContextProvider>
                                        </TrilhaContextProvider>
                                    </UserContextProvider>
                                </AdminContextProvider>
                            </SiteContextProvider>
                        </ConstantsContextProvider>
                    </AuthenticationContextProvider>
                </ToolsContextProvider>
            </LocalizationProvider>
        </ThemeProvider >
    );
}

export default Contexts;