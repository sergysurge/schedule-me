import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'companyFilter'})

export class CompanyFilterPipe implements PipeTransform {
    transform(value: any, args: any[]):any {
        if (args) {
            let target = args[0].toLowerCase()
            let filtered = value.filter((entry) => {
                let nameMatch = entry.company.name? entry.company.name.toLowerCase().indexOf(target) !== -1 : false
                let brandMatch = entry.company.brandName? entry.company.name.toLowerCase().indexOf(target) !== -1 : false
                let descriptionMatch = entry.company.description? entry.company.description.toLowerCase().indexOf(target) !== -1 : false
                return (nameMatch || brandMatch || descriptionMatch)
            })
            return filtered.length ? filtered : -1
        }
        return value
    }
}