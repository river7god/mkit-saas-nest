import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  export abstract class SystemBaseEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @CreateDateColumn({
      type: 'timestamp',
      update: false,
    })
    create_time!: Date;
  
    @UpdateDateColumn({
      type: 'timestamp',
    })
    update_time!: Date;

    @Column({ length: 64 })
    updater:string; // 更新人

    @Column({ length: 64 })
    creator:string; // 
    
    @Column('int')
    deleted:number;
  }