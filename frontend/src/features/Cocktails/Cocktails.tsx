import {useEffect} from 'react';
import {
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
import { getCocktails } from './coctailsThunks';

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

    return (
        <>
            <Grid container spacing={3}>
                {!isLoading ? cocktails.map((elem) => (
                    <Grid item xs={6} key={elem._id}>
                        {elem.image !== null ? <ImageCardMedia image={`http://localhost:8000/${elem.image}`}/> : ''}
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
                                Статус: {!elem.isPublished ? 'ваш коктейль находится на рассмотрении модератора' : 'опубликовано'}
                            </Typography>
                        </CardContent>

                    </Grid>
                )) : <CircularProgress />}</Grid>
        </>
    );
};

export default Cocktails;