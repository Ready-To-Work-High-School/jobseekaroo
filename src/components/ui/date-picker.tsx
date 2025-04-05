
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  selectsRange?: boolean
  startDate?: Date
  endDate?: Date
  placeholder?: string
  className?: string
}

export function DatePicker({
  selected,
  onSelect,
  selectsRange = false,
  startDate,
  endDate,
  placeholder = "Pick a date",
  className
}: DatePickerProps) {
  const dateDisplay = React.useMemo(() => {
    if (selectsRange && startDate) {
      return endDate 
        ? `${format(startDate, "PPP")} - ${format(endDate, "PPP")}` 
        : format(startDate, "PPP")
    }
    
    return selected ? format(selected, "PPP") : placeholder
  }, [selected, selectsRange, startDate, endDate, placeholder])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selected && !startDate && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateDisplay}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode={selectsRange ? "range" : "single"}
          selected={selectsRange ? 
            {
              from: startDate,
              to: endDate
            } : 
            selected
          }
          onSelect={onSelect}
          defaultMonth={startDate || selected}
          numberOfMonths={2}
          disabled={(date) => date < new Date("1900-01-01")}
          initialFocus
          className="p-3 pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  )
}
