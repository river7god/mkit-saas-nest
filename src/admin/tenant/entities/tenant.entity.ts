import { SystemBaseEntity } from "../../base/system.base.entity";
import {Status} from "../../base/base.enum"
import { IsEmail } from 'class-validator';   //npm install class-validator
import {
    Column,
    Entity, 
  } from 'typeorm';

export enum TenantStatus {
    ON = Status.ON, // 待完成
    OFF = Status.OFF, // 未完成
  }

@Entity()
export class Tenant extends SystemBaseEntity {
    @Column({ length: 64 })
    name: string;
    @Column('int')
    contact_user_id : number;  //'联系人的用户编号'

    @Column({ length: 64 })
    contact_name: string;

    contact_mobile:string
    
    @Column('int', { default: TenantStatus.ON })
    status:number;   //'租户状态（0正常 1停用）'
    
    domain:string;  //'绑定域名'

    @Column('int')
    package_id:number;   //'租户套餐编号'

    expire_time:Date;

    @Column('int')
    account_count:number;
}

