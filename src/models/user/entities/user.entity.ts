import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ name: 'first_name' })
  @Field()
  firstName: string;

  @Column({ name: 'last_name' })
  @Field()
  lastName: string;

  @Column({ name: 'email_id' })
  @Field()
  emailId: string;

  @Column({ name: 'phone_number' })
  @Field()
  phoneNumber: number;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at_user',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at_user',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
