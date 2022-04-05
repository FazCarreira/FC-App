import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, List, Paper, Typography } from "@mui/material";

import { AdminContext } from "../../../services/AdminContext";

import ModalForm from "../../../App/components/ModalForm";
import RowItem from "../../../App/components/RowItem";
import moment from "moment";

const Blog = () => {

    const navigate = useNavigate();
    const { getPost, getPosts, deletePost, posts } = useContext(AdminContext);

    const [action, setAction] = useState({});
    const [open, setOpen] = useState(false);

    // eslint-disable-next-line
    useEffect(() => getPosts(), []);

    const handlePost = (id) => async () => {
        if (id) await getPost(id);
        navigate(`/admin/blog/${id ? id : 'novo-post'}`);
    }

    const handleDelete = (post) => () => {
        setAction({
            title: `Deletar post ${post.title}?`,
            deleteLabel: "Atenção! Deletar é uma ação que não pode ser desfeita",
            onDelete: () => {
                deletePost(post._id)
                getPosts();
                setOpen(false);
            },
        });
        setOpen(true);
    };

    return (<>
        <Paper>
            <List>
                <Button variant='contained' fullWidth onClick={handlePost()}>
                    Adicionar Post
                </Button>
                {posts?.length > 0 ? (
                    posts?.reverse().map(post => (
                        <RowItem
                            key={post._id}
                            avatar={post.image}
                            primary={post.title}
                            secondary={moment(post.created).format('DD/MM/YYYY')}
                            onEdit={handlePost(post._id)}
                            onDelete={handleDelete(post)}
                        />
                    ))
                ) : (<Typography>Não existem postagens no blog atualmente</Typography>)}
                <ModalForm open={open} onClose={() => setOpen(false)} {...action} fullWidth maxWidth='md' />
            </List>
        </Paper>
    </>);
}

export default Blog;