import express from 'express';
import path from 'path';
import hbs from 'hbs';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import cookieParser from 'cookie-parser';
import '../misc/env.js'
import '../misc/db.js';
import articleRouter from './routes/articleRouter.js';
import adminRouter from './routes/adminRouter.js';
import graciosoRouter from './routes/gracioso.js';
import loginMiddleware from '../middlewares/locals.js';
import notFoundMiddleware from '../middlewares/notfound.js';
import errorMiddleware from '../middlewares/error.js';

const app = express();
const FileStore = sessionFileStore(session);

app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'views'));
hbs.registerPartials(path.join(process.env.PWD, 'views', 'partials'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.static(path.join(process.env.PWD, 'views')));

app.set('session cookie name', 'sid');
app.use(cookieParser());
const sessionConfig = {
  name: app.get('session cookie name'),
  secret: process.env.SESSION_SECRET,
  store: new FileStore({
    secret: process.env.SESSION_SECRET,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 1000 * 1,
    secure: process.env.NODE_ENV === 'production',
  },
};
app.use(session(sessionConfig));

app.use(loginMiddleware);



app.use('/admin', adminRouter);
app.use('/article', articleRouter);
app.use('/', graciosoRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
app.listen(process.env.PORT ?? 3000);

