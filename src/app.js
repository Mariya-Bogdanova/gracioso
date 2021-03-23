import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import hbs from 'hbs';
import adminRouter from './routes/adminRouter.js';

mongoose.connect('mongodb://localhost:27017/gracioso', { useNewUrlParser: true });
const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'views'));
hbs.registerPartials(path.join(process.env.PWD, 'views', 'partials'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.static(path.join(process.env.PWD, 'views')));

app.use('/secret', adminRouter);
app.listen(process.env.PORT ?? 3000);



// import methodOverride from 'method-override';

// import bcrypt from 'bcrypt';
// import session from 'express-session';
// import sessionFileStore from 'session-file-store';
// import cookieParser from 'cookie-parser';
// import fs from 'fs';

// const FileStore = sessionFileStore(session);
// app.use(cookieParser());
// const sessionConfig = {
// store: new FileStore(),
// key: 'user_sid',
// secret: 'hajskghbhhdhghfh vds hfghjhjgjkdx jkhgdfgdfg zsg gsfgs ardshgasd',
// resave: false,
// saveUninitialized: false,
// cookie: { express: 1000 * 6 },
// };
// app.use(session(sessionConfig));

// app.use(methodOverride((req, res) => {
//   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//     const method = req.body._method;
//     delete req.body._method;
//     return method;
//   }
// }));

// Middleware
// app.use((req, res, next) => {
//   req.accessTime = new Date();
//   console.info(req.url, req.accessTime);
//   next();
// });

// мидлвеар: ссылки по включении сессии:
// app.use((req, res, next) => {
//   if (!req.session.user) {
//     res.locals.validate = true;  // validate - имя флага, передаваемого в лайаут
//     res.locals.logout = false;
//   } else {
//     res.locals.validate = false;
//     res.locals.logout = true;
//   }
//   next();
// });

// ФУНКЦИЯ ПОЛУЧЕНИЯ НЕСКОЛЬКИХ ШАБЛОНОВ:
// СОЗДАНИЕ  СВОЙ ФУНКЦИИ В ОТ HBS
// hbs.registerHelper('htmlTemplate', (name) => {
//   hbs.cachedTemplates = hbs.cachedTemplates || {};
//   const template = hbs.cachedTemplates[name]
//     || fs.readFileSync(`views/partials/${name}.hbs`, 'utf8');
//   hbs.cachedTemplates[name] = template;
//   return new hbs.handlebars.SafeString(
//     `<template id="${name}Template">
// ${hbs.handlebars.Utils.escapeExpression(template)}
// </template>`);
// });
// ФУНКЦИЯ ПРИНИМАЕТ НА ВХОД ИМЯ ШАБЛОНА, И ОТДАЕТ ШАБЛОН HTML
