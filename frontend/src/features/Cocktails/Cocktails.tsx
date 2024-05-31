import {useEffect} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Grid,
    styled,
    Typography
} from '@mui/material';
import {selectUser} from '../Users/usersSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../App/hooks';
import { selectCocktails, selectIsLoading } from './coctailsSlice';
import { deleteCocktail, getCocktails, publishCocktail } from './coctailsThunks';
import { apiUrl } from '../../consttants';

const Cocktails = () => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(selectCocktails);
    const isLoading = useAppSelector(selectIsLoading);
    const user = useAppSelector(selectUser);


    useEffect(() => {
        const fetchUrl = async () => {
            await dispatch(getCocktails());
        };
        void fetchUrl();
    }, [dispatch]);


    const ImageCardMedia = styled(CardMedia)({
        height: 0,
        paddingTop: '56.25%',
    });

    const deleteOneCocktail = async (id: string) => {
        await dispatch(deleteCocktail(id));
        await dispatch(getCocktails());
    };

    const publish = async (id: string) => {
        await dispatch(publishCocktail(id));
        await dispatch(getCocktails());
    };

    return (
        <>
            <Grid container spacing={3}>
                {!isLoading ? cocktails.map((elem) => (
                    <Grid item xs={6} key={elem._id}>
                        {user && user.role === 'admin' ? <Card>
                            {elem.image ? <ImageCardMedia image={`${apiUrl}/${elem.image}`}/> : ''}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {elem.name}
                                </Typography>
                                <Typography gutterBottom component="div">
                                    {elem.ingredients.map((ingredient) => (
                                        <Grid key={ingredient._id}>
                                            <Typography component="div">
                                                {`name: ${ingredient.ingredientName}, quantity: ${ingredient.quantity}`}
                                            </Typography>
                                        </Grid>
                                    ))}
                                </Typography>
                                <Typography gutterBottom component="div">
                                    Recipe: {elem.recipe}
                                </Typography>
                                <Typography gutterBottom component="div">
                                    Статус: {!elem.isPublished ? 'не опубликовано' : 'опубликовано'}
                                </Typography>
                            </CardContent>
                            <Typography component="div" sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <Button sx={{color: 'red'}} onClick={() => deleteOneCocktail(elem._id)}>Удалить</Button>
                                <Button
                                    onClick={() => publish(elem._id)}>{elem.isPublished ? 'Снять с публикации' : 'Опубликовать'}</Button>
                            </Typography>
                        </Card> : elem.isPublished ? <Card>
                            {elem.image ? <ImageCardMedia image={`${apiUrl}/${elem.image}`}/> : ''}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {elem.name}
                                </Typography>
                                <Typography gutterBottom component="div">
                                    {elem.ingredients.map((ingredient) => (
                                        <Grid key={ingredient._id}>
                                            <Typography component="div">
                                                {`name: ${ingredient.ingredientName}, quantity: ${ingredient.quantity}`}
                                            </Typography>
                                        </Grid>
                                    ))}
                                </Typography>
                                <Typography gutterBottom component="div">
                                    Recipe: {elem.recipe}
                                </Typography>
                            </CardContent>
                        </Card> : ''}
                    </Grid>
                )) : <CircularProgress/>}
            </Grid>
        </>
    );
}

export default Cocktails;