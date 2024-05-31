import {AppBar, Grid, styled, Toolbar, Typography} from '@mui/material';
import {Link as navLink} from 'react-router-dom';
import {useAppSelector} from '../../App/hooks.ts';
import { selectUser } from '../features/Users/usersSlice';
import UserMenu from './UI/UserMenu';
import AnonymousMenu from './UI/AnonymousMenu';

const Link = styled(navLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit',
    },
});

const AppToolbar = () => {
    const user = useAppSelector(selectUser);

    return (
        <>
            <AppBar position="sticky" sx={{mb: 2}}>
                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            <Link to="/">Cocktails</Link>
                        </Typography>
                        {user ? (
                            <UserMenu user={user}/>
                        ) : (
                            <AnonymousMenu />
                        )}
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default AppToolbar;