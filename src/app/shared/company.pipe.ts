import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'companyFilter'})

export class CompanyFilterPipe implements PipeTransform {
    transform(value: any, args: any[]):any {
        if (args) {
            let target = args[0].toLowerCase()
            let filtered = value.filter((company) => {
                let nameMatch = company.name && company.name.toLowerCase().indexOf(target) !== -1
                let brandMatch = company.brandName && company.brandName.toLowerCase().indexOf(target) !== -1
                let descriptionMatch = company.description && company.description.toLowerCase().indexOf(target) !== -1
                return (nameMatch || brandMatch || descriptionMatch)
            })
            return filtered.length ? filtered : [-1]
        }
        return value
    }
}