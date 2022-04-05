import styled from "@emotion/styled";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const Title = styled(DialogTitle)(({ theme }) => ({
    textTransform: 'uppercase',
    fontFamily: 'Righteous',
    fontSize: theme.typography.pxToRem(24),
    marginRight: theme.spacing(2)
}))

const ModalForm = ({ body, onClose, onConfirm, open, title, deleteLabel, onDelete, onSave, data, onData }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
        >
            <Title>{title}</Title>
            <DialogContent>
                <Box sx={{ mt: 1 }}>
                    {deleteLabel ?
                        deleteLabel
                        : body
                    }
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Fechar
                </Button>
                {onDelete && <Button onClick={() => onDelete(data)} color="secondary">
                    Deletar
                </Button>}
                {onSave && <Button onClick={() => onSave(data)} color="secondary">
                    Salvar
                </Button>}
                {onConfirm && <Button onClick={() => onConfirm(data)} color="secondary">
                    Eu aceito os termos de uso do aplicativo
                </Button>}
                {(onData && data?.fim) && <Button onClick={() => onData(data)} color="secondary">
                    Encerrar
                </Button>
                }
            </DialogActions>
        </Dialog>
    );
}

export default ModalForm;