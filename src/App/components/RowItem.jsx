import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { Component } from "react";
import { FaPen, FaTimes, FaTrash } from "react-icons/fa";

const RowItem = ({ avatar, primary, secondary, onEdit, onDelete, onPress, onCancel, onAvatar, IconButtons, alt, status, ...rest }) => {

    const color = () => {
        switch (status) {
            case 'new':
                return '#afa';
            case 'del':
                return '#faa';
            case 'edit':
                return '#ffa';
            default:
                return;
        }
    }

    return (
        <ListItem
            button={!!onPress}
            onClick={onPress}
            sx={{ backgroundColor: color() }}
            {...rest}
        >
            {(avatar || alt) && (<>
                {typeof avatar === typeof <Component /> && !alt ? (
                    < ListItemIcon onClick={onAvatar}>
                {avatar}
            </ListItemIcon>
            ) : (
            <ListItemAvatar onClick={onAvatar}>
                <Avatar src={avatar} alt={typeof primary === 'string' ? primary : alt} />
            </ListItemAvatar>
            )}
        </>)
}
            <ListItemText
                primary={primary}
                secondary={secondary}
            />
            <ListItemSecondaryAction>
                {onEdit && <IconButton edge="end" aria-label="more-optios" sx={{mx:1}}
                    onClick={onEdit}
                >
                    <FaPen />
                </IconButton>}
                {onDelete && <IconButton edge="end" aria-label="more-optios" sx={{mx:1}}
                    onClick={onDelete}
                >
                    <FaTrash />
                </IconButton>}
                {onCancel && <IconButton edge="end" aria-label="more-optios" sx={{mx:1}}
                    onClick={onCancel}
                >
                    <FaTimes />
                </IconButton>}
                {IconButtons?.map((ib,i) =>ib?.icon?(
                    <IconButton key={i} edge="end" aria-label="more-optios" sx={{mx:1}} onClick={ib?.onClick}>
                        {ib?.icon}
                    </IconButton>
                ):(
                    <Box key={i} sx={{display: 'inline'}} >
                        {ib}
                    </Box>
                ))}
            </ListItemSecondaryAction>
        </ListItem >
    );
}

export default RowItem;