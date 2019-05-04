import { Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'kanicase'
})

export class KanicasePipe implements PipeTransform {
    transform(value: string, finisher: string): string {

        let i = 0;
        let res = '';
        for (let letter of value) {
            if(i % 2 != 0) {
                letter = letter.toLocaleUpperCase();
            } else {
                letter = letter.toLocaleLowerCase();
            }
            res += letter;
            i++;
        }

        res += finisher;

        return res;

    }
}