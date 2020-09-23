interface StringArray {
 [index: number]: string;
}

interface Meeting {
 date: number,
 title: string,
 description: string,
 links: StringArray,
 notes?: string
}