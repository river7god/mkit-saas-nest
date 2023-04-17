import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';  //  npm i --save class-validator class-transformer
import { IsEmail, IsMobilePhone } from 'class-validator';
import { SystemBaseEntity } from 'src/admin/base/system.base.entity';
import { Gender,Status } from 'src/admin/base/base.enum';
import {
  BeforeInsert,
  Column,
  Entity, 
} from 'typeorm';

@Entity('system_users')
export class User extends SystemBaseEntity {

  @ApiProperty({ description: '用户名' })
  @Column({ length: 64 })
  username: string;

  @ApiProperty({ description: '密码' })
  @Column({ length: 256 })
  password: string;

  @ApiProperty({ description: '用户昵称' })
  @Column({ length: 64 })
  nickname : string;

  @Column({ length: 512 })
  remark:string;

  @ApiProperty({ description: '邮箱' })
  @Column({ length: 256 })
  @IsEmail()
  email: string;

  @IsMobilePhone()
  mobile:string;

  @Column('int', { default: Gender.MAN })
  sex:number;

  @ApiProperty({ description: '头像地址' })
  avatar:string;  //'头像地址'

  @ApiProperty({ description: '是否为管理员' })
  @Column('int', { default: 1 })
  is_admin?: number;

  @Column('int', { default: Status.ON })
  status:number;


  @ApiProperty({ description: '部门ID' })
  @Column('int')
  dept_id:number;

  @ApiProperty({ description: '岗位编号数组' })
  post_ids:string;  //'岗位编号数组'


  login_ip:string; //登录ip
  login_date:Date;  // 登录时间

  @Column('int')
  tenant_id:number; // 租户id

  @BeforeInsert()
  private async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
