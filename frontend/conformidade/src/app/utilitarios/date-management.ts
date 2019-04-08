export function BrFormatDateFromDate(date: Date) {
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

export function DateFromBrFormatDate(date: string): Date {
    
    const split = date.split('/');

    if (split.length < 3) {
        return new Date();
    }

    try {
        const year: number = parseInt(split[2], 10);
        const month: number = parseInt(split[1], 10);
        const day: number = parseInt(split[0], 10);

        return new Date(year, month - 1, day);
    } catch {
        return new Date();
    }
}

export function DateFromBrString(date: string): string {

    if (date.length == 8) {
        const year: string = date.substring(0, 4);
        const month: string = date.substring(4, 6);
        const day: string = date.substring(6, 8);

        return day + month + year;
    }else{
        return date;
    }
}