import Meeting from './Meeting';

interface Response {
 state: 'OK' | 'KO',
 message: string,
 data: object | string | number | null | Meeting | Meeting[]
}

export = Response;