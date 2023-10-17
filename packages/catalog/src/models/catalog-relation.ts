import {
  Entity,
  ManyToOne,
  OptionalProps,
  PrimaryKey,
  Property,
  Ref,
} from "@mikro-orm/core"
import Catalog from "./catalog"

type OptionalRelations =
  | "parent"
  | "child"
  | "parent_id"
  | "child_id"
  | "parent_name"
  | "child_name"

@Entity({ tableName: "catalog_relation" })
export class CatalogRelation {
  [OptionalProps]: OptionalRelations

  @PrimaryKey({ columnType: "text", autoincrement: true })
  id!: string

  @Property({ columnType: "text" })
  parent_id?: string

  @Property({ columnType: "text" })
  parent_name?: string

  @Property({ columnType: "text" })
  child_id?: string

  @Property({ columnType: "text" })
  child_name?: string

  @ManyToOne({
    entity: () => Catalog,
    onDelete: "cascade",
    persist: false,
  })
  parent?: Ref<Catalog>

  @ManyToOne({
    entity: () => Catalog,
    onDelete: "cascade",
    persist: false,
  })
  child?: Ref<Catalog>
}

export default CatalogRelation