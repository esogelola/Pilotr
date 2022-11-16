import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

// Create a new entity class called Company with properties id, employeeCount, name, address, country, useDataSpace, createdAt, updatedAt, and deletedAt, admin user id

@Entity()
export class Company {
  @PrimaryKey()
  id!: number;

  @Property()
  employeeCount!: number;

  @Property({ type: "text" })
  name!: string;

  @Property({ type: "text" })
  address!: string;

  @Property({ type: "text" })
  country!: string;

  @Property()
  usedDataSpace!: number;

  @Property({ type: "date" })
  createdAt? = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt? = new Date();

  @Property({ type: "date", nullable: true })
  deletedAt?: Date;
}
