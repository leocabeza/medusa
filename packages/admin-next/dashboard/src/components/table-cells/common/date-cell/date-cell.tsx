import { Tooltip } from "@medusajs/ui"
import format from "date-fns/format"
import { useTranslation } from "react-i18next"

type DateCellProps = {
  date: Date
}

export const DateCell = ({ date }: DateCellProps) => {
  const value = new Date(date)
  value.setMinutes(value.getMinutes() - value.getTimezoneOffset())

  const hour12 = Intl.DateTimeFormat().resolvedOptions().hour12
  const timestampFormat = hour12 ? "dd MMM yyyy hh:MM a" : "dd MMM yyyy HH:MM"

  return (
    <div className="w-full h-full overflow-hidden flex items-center">
      <Tooltip
        className="z-10"
        content={
          <span className="text-pretty">{`${format(
            value,
            timestampFormat
          )}`}</span>
        }
      >
        <span className="truncate">{format(value, "dd MMM yyyy")}</span>
      </Tooltip>
    </div>
  )
}

export const DateHeader = () => {
  const { t } = useTranslation()

  return (
    <div className="w-full h-full flex items-center">
      <span className="truncate">{t("fields.date")}</span>
    </div>
  )
}
