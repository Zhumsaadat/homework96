import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {NewCocktails} from '../../types';
import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import FileInput from '../../components/UI/FileInput.tsx';
import { useAppDispatch } from '../../../App/hooks';
import { addCocktail } from './coctailsThunks';

const CocktailsForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [state, setState] = useState<NewCocktails>({
        name: '',
        image: null,
        recipe: '',
        ingredients: [{
            ingredientName: '',
            quantity: '',
        }],
    });

    useEffect(() => {
        const fetchUrl = async () => {
            await dispatch(addCocktail(state));
        };

        void fetchUrl();
    }, []);

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setState(prevState => ({
                ...prevState, [name]: files[0]
            }));
        }
    };


    const formSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        navigate('/');
    };

    return (
        <>
            <Typography variant="h4">Add cocktail</Typography>
            <Box component="form" onSubmit={formSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="name"
                            name="name"
                            autoComplete="name"
                            value={state.name}
                            onChange={inputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="recipe"
                            name="recipe"
                            autoComplete="recipe"
                            value={state.recipe}
                            onChange={inputChange}
                            fullWidth
                        />
                    </Grid>
                    {state.ingredients.map((elem, i) => (
                        <Grid item xs={12} sx={{ mb: 3 }} key={`${elem.ingredientName}-${i}`}>
                            <TextField
                                label="ingredientName"
                                name={`ingredientName-${i}`}
                                autoComplete={`ingredientName-${i}`}
                                value={state.ingredients[i].ingredientName}
                                onChange={inputChange}
                                fullWidth
                            />
                            <TextField
                                label="quantity"
                                name={`quantity-${i}`}
                                autoComplete={`quantity-${i}`}
                                value={state.ingredients[i].quantity}
                                onChange={inputChange}
                                fullWidth
                            />
                        </Grid>
                    ))}
                    <FileInput label="image" name="image" onChange={fileInputChangeHandler}/>
                </Grid>
                <Button type="submit">Create album</Button>
            </Box>
        </>
    );
};

export default CocktailsForm;