import { IStyle } from '../entities/iStyle';

export class FormStyle {
    styles: IStyle[];
    TYPE = {
        MOVIL: 1,
        TABLET: 2,
        DEFAULT: 3
    };

    constructor(style: IStyle[]) {
        this.styles = style;
    }

    get(name: string): IStyle {
        return this.styles.find(style => style.name === name);
    }

    static createActive() {
        return this.getOptions([{ todos: -1 }, { si: 1 }, { no: 0 }], ['Todos', 'Si', 'No']);
    }

    static getOptions<T>(objectToCreate: T[] = [], names: (string | number)[] = []) {
        const toReturn = [];
        let i = 0;
        if (!objectToCreate) return [];
        objectToCreate.forEach((element, index) => {
            const obj = {};
            obj['label'] = names[i];
            obj['value'] = element[Object.keys(element)[0]];
            toReturn[index] = obj;
            i++;
        });
        return toReturn;
    }

    static getNames<T, K extends keyof T>(arr: T[], ...keys: K[]): string[] {
        let toReturn = [];
        arr.forEach(value => {
            let str = '';
            keys.forEach((v, i) => str += value[v] + ((keys.length < 1) ? '' : ' '));
            toReturn.push(str);
        });
        return toReturn;
    }
}
