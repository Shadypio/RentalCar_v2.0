import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../common/role/role';

@Pipe({
  name: 'roleName'
})
export class RoleNamePipe implements PipeTransform {

  transform(value: Role): unknown {
    return value.id + " - " + value.roleName;
  }

}
