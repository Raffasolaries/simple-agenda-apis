interface StringArray {
 [index: number]: string;
}

interface Meeting {
 id: string,
 date: number,
 title: string,
 description: string,
 links: StringArray,
 notes?: string
}

export = Meeting;