import { Button, clx } from "@medusajs/ui"
import * as Popover from "@radix-ui/react-popover"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { DataTableFilterContext, useDataTableFilterContext } from "./context"
import { DateFilter } from "./date-filter"
import { SelectFilter } from "./select-filter"

type Option = {
  label: string
  value: unknown
}

export type Filter = {
  key: string
  label: string
} & (
  | {
      type: "select"
      options: Option[]
      multiple?: boolean
      searchable?: boolean
    }
  | {
      type: "date"
      options?: never
    }
)

type DataTableFilterProps = {
  filters: Filter[]
  prefix?: string
}

export const DataTableFilter = ({ filters, prefix }: DataTableFilterProps) => {
  const [searchParams] = useSearchParams()
  const [open, setOpen] = useState(false)

  const [activeFilters, setActiveFilters] = useState(
    getInitialFilters({ searchParams, filters, prefix })
  )

  const availableFilters = filters.filter(
    (f) => !activeFilters.find((af) => af.key === f.key)
  )

  /**
   * If there are any filters in the URL that are not in the active filters,
   * add them to the active filters. This ensures that we display the filters
   * if a user navigates to a page with filters in the URL.
   */
  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    filters.forEach((filter) => {
      const key = prefix ? `${prefix}_${filter.key}` : filter.key
      const value = params.get(key)
      if (value && !activeFilters.find((af) => af.key === filter.key)) {
        if (filter.type === "select") {
          setActiveFilters((prev) => [
            ...prev,
            {
              ...filter,
              multiple: filter.multiple,
              options: filter.options,
              openOnMount: false,
            },
          ])
        } else {
          setActiveFilters((prev) => [
            ...prev,
            { ...filter, openOnMount: false },
          ])
        }
      }
    })
  }, [activeFilters, filters, searchParams, prefix])

  const addFilter = (filter: Filter) => {
    setOpen(false)
    setActiveFilters((prev) => [...prev, { ...filter, openOnMount: true }])
  }

  const removeFilter = (key: string) => {
    setActiveFilters((prev) => prev.filter((f) => f.key !== key))
  }

  const removeAllFilters = () => {
    setActiveFilters([])
  }

  return (
    <DataTableFilterContext.Provider
      value={useMemo(
        () => ({
          removeFilter,
          removeAllFilters,
        }),
        [removeAllFilters, removeFilter]
      )}
    >
      <div className="flex items-center gap-2 flex-wrap max-w-2/3">
        {activeFilters.map((filter) => {
          if (filter.type === "select") {
            return (
              <SelectFilter
                key={filter.key}
                filter={filter}
                prefix={prefix}
                options={filter.options}
                multiple={filter.multiple}
                searchable={filter.searchable}
                openOnMount={filter.openOnMount}
              />
            )
          }

          return (
            <DateFilter
              key={filter.key}
              filter={filter}
              prefix={prefix}
              openOnMount={filter.openOnMount}
            />
          )
        })}
        {availableFilters.length > 0 && (
          <Popover.Root modal open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild id="filters_menu_trigger">
              <Button size="small" variant="secondary">
                Add filter
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className={clx(
                  "bg-ui-bg-base text-ui-fg-base shadow-elevation-flyout max-h-[200px] h-full w-[300px] overflow-hidden rounded-lg outline-none z-[1] p-1"
                )}
                data-name="filters_menu_content"
                align="start"
                sideOffset={8}
                collisionPadding={8}
                onCloseAutoFocus={(e) => {
                  const hasOpenFilter = activeFilters.find(
                    (filter) => filter.openOnMount
                  )

                  if (hasOpenFilter) {
                    e.preventDefault()
                  }
                }}
              >
                {availableFilters.map((filter) => {
                  return (
                    <div
                      className="bg-ui-bg-base hover:bg-ui-bg-base-hover focus-visible:bg-ui-bg-base-pressed text-ui-fg-base data-[disabled]:text-ui-fg-disabled txt-compact-small relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 outline-none transition-colors data-[disabled]:pointer-events-none"
                      role="menuitem"
                      key={filter.key}
                      onClick={() => {
                        addFilter(filter)
                      }}
                    >
                      {filter.label}
                    </div>
                  )
                })}
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        )}
        {activeFilters.length > 0 && (
          <ClearAllFilters filters={filters} prefix={prefix} />
        )}
      </div>
    </DataTableFilterContext.Provider>
  )
}

type ClearAllFiltersProps = {
  filters: Filter[]
  prefix?: string
}

const ClearAllFilters = ({ filters, prefix }: ClearAllFiltersProps) => {
  const { removeAllFilters } = useDataTableFilterContext()
  const [_, setSearchParams] = useSearchParams()

  const handleRemoveAll = () => {
    setSearchParams((prev) => {
      const newValues = new URLSearchParams(prev)

      filters.forEach((filter) => {
        newValues.delete(prefix ? `${prefix}_${filter.key}` : filter.key)
      })

      return newValues
    })

    removeAllFilters()
  }

  return (
    <button
      type="button"
      onClick={handleRemoveAll}
      className={clx(
        "px-2 py-1 text-ui-fg-muted transition-fg rounded-md txt-compact-small-plus",
        "hover:text-ui-fg-subtle",
        "focus-visible:shadow-borders-focus"
      )}
    >
      Clear all
    </button>
  )
}

const getInitialFilters = ({
  searchParams,
  filters,
  prefix,
}: {
  searchParams: URLSearchParams
  filters: Filter[]
  prefix?: string
}) => {
  const params = new URLSearchParams(searchParams)
  const activeFilters: (Filter & { openOnMount: boolean })[] = []

  filters.forEach((filter) => {
    const key = prefix ? `${prefix}_${filter.key}` : filter.key
    const value = params.get(key)
    if (value) {
      if (filter.type === "select") {
        activeFilters.push({
          ...filter,
          multiple: filter.multiple,
          options: filter.options,
          openOnMount: false,
        })
      } else {
        activeFilters.push({ ...filter, openOnMount: false })
      }
    }
  })

  return activeFilters
}
