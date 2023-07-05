// TODO: Should we create a mikro orm specific package for this and the base repository?

import { Filter } from "@mikro-orm/core"

interface FilterArguments {
  withDeleted?: boolean
}

export const SoftDeletableKey = Symbol("softDeletable")

export const SoftDeletable = (): ClassDecorator => {
  return Filter({
    name: "softDeletable",
    cond: ({ withDeleted }: FilterArguments = {}) => {
      if (withDeleted) {
        return {}
      }
      return {
        deleted_at: null,
      }
    },
    default: true,
  })
}
