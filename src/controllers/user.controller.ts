import { Effect, combineRoutes, matchPath, matchType } from '@marblejs/core';
import { map, switchMap } from 'rxjs/operators';
import { Dao } from '../fake/dao.fake';

const getUser$: Effect = request$ => request$
    .pipe(
        matchPath('/'),
        matchType('GET'),
        switchMap(Dao.getUsers),
        map(users => ({ body: users }))
    );

const postUser$: Effect = request$ => request$  
    .pipe(
        matchPath('/'),
        matchType('POST'),
        map(req => req.body),
        switchMap(Dao.postUser),
        map(response => ({body: response}))
    );

export const user$ = combineRoutes(
    '/users',
    [getUser$, postUser$],
);
