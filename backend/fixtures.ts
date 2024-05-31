
import config from './config';
import User from './models/User';
import Cocktail from './models/Cocktail';
import mongoose from 'mongoose';


const dropCollections = async (db: mongoose.Connection, collectionName: string) => {
    try {
        await db.dropCollection(collectionName);
    } catch {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};

const collections = ['cocktails', 'users'];

const resetDB = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    for (const collection of collections) await dropCollections(db, collection);

    const [user1, user2] = await User.create(
        {
            email: 'user@gmail.com',
            password: '123',
            token: crypto.randomUUID(),
            role: 'user',
            avatar: null,
            googleID: null,
            displayName: 'user'
        },
        {
            email: 'admin@gmail.com',
            password: '123',
            token: crypto.randomUUID(),
            role: 'admin',
            avatar: null,
            googleID: null,
            displayName: 'admin'
        },
    )

    await Cocktail.create(
        {
            user: user1,
            name: "Пина колада",
            image: "images/mohito.jpeg",
            recipe: "Поместить все ингредиенты в блендер со льдом и взбивать на средней скорости в течение 15-20 секунд. Перелить содержимое в бокал.",
            isPublished: true,
            ingredients: [{
                ingredientName: "Белый ром",
                quantity: "30ml",
            }],
        },
        {
            user: user2,
            name: "Мохито",
            image: "images/пина.jpeg",
            recipe: "Нарезаем лайм и кладем в бокал.\n" +
                "Добавляем мяту, тростниковый сахар и разминаем.\n" +
                "Добавляем ледяную крошку и перекладываем смесь в шейкер. Взбиваем.\n" +
                "Перекладываем в бокал и заливаем спрайтом.\n" +
                "Декорируем коктейль листиком мяты и лаймом — напиток готов.\n",
            isPublished: false,
            ingredients: [{
                ingredientName: "белый ром",
                quantity: "30ml",
            }],
        },
    );
    await db.close();
};

void resetDB();