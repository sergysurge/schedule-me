import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'companyFilter'})

export class CompanyFilterPipe implements PipeTransform {
    transform(value: any, args: any[]):any {
        console.log(value, args)
        if (args) {
            let target = args[0].toLowerCase()
            return value.filter((company) => {
                let nameMatch = company.name? company.name.toLowerCase().indexOf(target) !== -1 : false
                // let brandMatch = company.brandName? company.name.toLowerCase().indexOf(target) !== -1 : false
                let descriptionMatch = company.description? company.description.toLowerCase().indexOf(target) !== -1 : false
                return (nameMatch || descriptionMatch)
            })
        }
        return value
    }
}