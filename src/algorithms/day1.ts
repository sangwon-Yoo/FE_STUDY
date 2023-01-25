export const getLetterSize = (message: string) => {
    return message.length * 2;
};

export const getLetterSize2 = (message: any): number => {

    if(typeof message !== "string") return -1;

    return message.length * 2;
};

export const getStrlenList = (strList: Array<string>): Array<number> => {
    return strList.map(str => str.length);
};