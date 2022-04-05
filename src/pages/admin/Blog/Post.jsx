import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import ReactQuill from 'react-quill';
import { AdminContext } from '../../../services/AdminContext';
import 'react-quill/dist/quill.snow.css';
// import Img from './image.svg';
import { Button, Chip, Grid, InputAdornment, TextField } from '@mui/material';
import ImageInput from '../../../App/components/ImageInput';
import { ToolsContext } from '../../../services/ToolsContext';
const Post = () => {

    const { id } = useParams();

    const newPost = id === 'novo-post';
    const { uploadImage } = useContext(ToolsContext);
    const { createPost, updatePost, post, uploadFile } = useContext(AdminContext);
    const navigate = useNavigate();

    const [html, setHtml] = useState("");
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [file, setFile] = useState();
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('');
    const removeTag = (i) => () => setTags(t => t.filter((_, j) => j !== i));
    const TagChange = ({ target: { value } }) => {
        if (value.includes(',')) {
            const t = tags
            t.push(value.replace(',', ''))
            setTags(t);
            setTag('');
        }
        else setTag(value);
    };

    const titleChange = ({ target: { value } }) => setTitle(value);
    const subtitleChange = ({ target: { value } }) => setSubtitle(value);

    // eslint-disable-next-line
    useEffect(async () => {
        if (!newPost && post) {
            setTitle(post?.title || "");
            setSubtitle(post?.subtitle || "");
            setHtml(post?.html);
            setFile({ src: post.image });
            setTags(post?.tags);
        }
        // eslint-disable-next-line
    }, [newPost]);

    // useEffect(() => {
    //     const newHtml = convertToHTML(editorState.getCurrentContent());
    //     setHtml(newHtml);
    // }, [editorState]);

    const handlePost = async () => {
        let res;
        if (newPost) res = createPost({ title, subtitle, tags, image: file?.src, html });
        else res = updatePost(id, { title, subtitle, tags, html, image: file?.src });
        if (res) navigate(-1);
    }

    const onFile = async (fileIn) => {
        let fileData = new FormData();
        fileData.append("uploadedFile", fileIn);
        const file = await uploadImage(fileData);
        setFile(file);
    }

    return (
        <Grid component='form' container spacing={2} sx={{ mt: 1 }} >
            <Grid item xs={12}>
                <TextField
                    name='title'
                    label='Título do post'
                    value={title}
                    onChange={titleChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name='subtitle'
                    label='Subtítulo'
                    value={subtitle}
                    onChange={subtitleChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label='Tags'
                    value={tag}
                    onChange={TagChange}
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{tags.map((tag, i) => <Chip key={i} color='primary' label={tag} onDelete={removeTag(i)} />)}</InputAdornment>,
                    }}
                />
            </Grid>
            <ImageInput file={file} onChange={onFile} />
            <Grid item xs={12}>
                <ReactQuill
                    value={html}
                    onChange={setHtml}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant='contained' onClick={handlePost} >Enviar Postagem</Button>
                <Button onClick={() => navigate(-1)} >voltar</Button>
            </Grid>
        </Grid >
    );
}

export default Post;