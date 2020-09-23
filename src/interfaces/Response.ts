interface Response {
 state: 'OK' | 'KO',
 message: string,
 data: object | string | number | null
}

export = Response;