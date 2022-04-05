import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography
} from '@mui/material';

import styles from './styles';

import Form from '../../App/components/Form';

import { ToolsContext } from '../../services/ToolsContext';
import { ConstantsContext } from '../../services/ConstantsContext';
import { AuthenticationContext } from '../../services/AuthContext';

function Login() {
  const style = styles();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    emailR: '', pass: '', pass2: '', role: '',
    name: '', phone: '',
  });
  const { email, password, emailR, pass, pass2, role, name, phone } = formData;

  const { loading, addAlert } = useContext(ToolsContext)
  const { isMobile } = useContext(ConstantsContext)
  const { register, login, isAuthenticated, user } = useContext(AuthenticationContext)

  const onChange = ({ target }) => setFormData({ ...formData, [target.name]: target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };


  const onSubmitReg = async (e) => {
    e.preventDefault();
    if (pass !== pass2 || pass.trim() === '') return addAlert('As senhas precisam ser iguais', 'warning');
    await register(emailR, pass, role, name, phone);
  };

  if (isAuthenticated) {
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin/editar_site" />;
      case 'aluno':
        return <Navigate to="/aluno/" />;
      case 'facilitador':
        return <Navigate to="/facilitador/" />;
      case 'empresa':
        return <Navigate to="/empresa/" />;
      default:
        break;
    }
  }
  return (
    <Grid container className={isMobile ? style.backgroundMobile : style.background} alignItems='center' justifyContent='center' >
      <Grid item xs sm={8} md={6} lg={4} sx={{ marginX: 4 }} >
        <Paper className={style.paper}>
          <Typography
            align='center'
            component='h1'
            variant='h4'
            style={{ textTransform: 'uppercase', fontFamily: 'Righteous' }}>
            Vem fazer carreira com a gente!
          </Typography>
          <Box sx={{ marginTop: 2, width: 128, height: 4, backgroundColor: '#Ccc' }} />
          <Box sx={{ width: '100%', marginTop: 2, paddingX: 3, backgroundColor: '#Ccc' }}>
            <Typography
              align='center'
              component='h2'
              variant='subtitle1'
            >
              Efetue o cadastro para ter acesso a plataforma
            </Typography>
          </Box>
          <form className={style.form} noValidate onSubmit={onSubmitReg}>
            <Grid container spacing={2}>
              {registerQuestions.map(q => <Form key={q.name} question={q} value={formData[q.name]} onChange={onChange} />)}
              <Grid item xs={12}>
                {loading ? <Button
                  disabled
                  fullWidth
                  variant='contained'
                  color='primary'>
                  <CircularProgress color='inherit' />
                </Button> : <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={style.submit}>
                  Cadastrar
                </Button>
                }
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <Grid item xs sm={8} md={6} lg={4} sx={{ marginX: 4 }} >
        <Paper className={style.paper}>
          <Typography
            align='center'
            component='h1'
            variant='h4'
            style={{ textTransform: 'uppercase', fontFamily: 'Righteous' }}
          >
            Já estou fazendo carreira
          </Typography>
          <Box sx={{ marginTop: 2, width: 128, height: 4, backgroundColor: '#Ccc' }} />
          <Box sx={{ width: '100%', marginTop: 2, paddingX: 3, backgroundColor: '#Ccc' }}>
            <Typography
              align='center'
              component='h2'
              variant='subtitle1'
            >
              Acesse a plataforma
            </Typography>
          </Box>
          <form className={style.form} noValidate onSubmit={onSubmit}>
            <Grid container spacing={2}>
              {loginQuestions.map(q => <Form key={q.name} question={q} value={formData[q.name]} onChange={onChange} />)}
              <Grid item xs={12}>
                {loading ? <Button
                  disabled
                  fullWidth
                  variant='contained'
                  color='primary'>
                  <CircularProgress color='inherit' />
                </Button> : <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={style.submit}>
                  Entrar
                </Button>
                }
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

const registerQuestions = [
  {
    question: 'Sou um(a):',
    name: 'role',
    type: 'select',
    options: ['aluno', 'facilitador', 'fornecedor', 'empresa'],
    full: true,
  },
  {
    question: 'Qual seu nome?',
    name: 'name',
    full: true,
  }, {
    question: 'Digite seu Email',
    name: 'emailR',
  }, {
    question: 'Qual seu telefone?',
    name: 'phone',
    mask: '+55 (99) 99999 9999'
  },
  {
    question: 'Digite uma senha',
    name: 'pass',
    type: 'password'
  }, {
    question: 'Confirme sua senha?',
    name: 'pass2',
    type: 'password'
  }
]

const loginQuestions = [
  {
    question: 'Digite seu Email',
    name: 'email',
    full: true,
  }, {
    question: 'Digite sua senha',
    name: 'password',
    type: 'password',
    full: true
  }
]

export default Login;